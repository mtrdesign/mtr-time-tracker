from django.db.models import Q, Count, Sum

from rest_framework import filters
from rest_framework import viewsets
from rest_framework.response import Response

from time_tracker.models import TimeReport
from time_tracker.serializers import TimeReportSerializer
from time_tracker.permissions import TimeReportPermission
from time_tracker.filters import time_report_filter


class TimeReportViewSet(viewsets.ModelViewSet):
    queryset = TimeReport.objects.all()
    serializer_class = TimeReportSerializer
    permission_classes = (TimeReportPermission,)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = time_report_filter.TimeReportFilter

    def get_queryset(self):
        user = self.request.user
        time_report = (TimeReport.objects
                       .filter(is_active=True, profile__isnull=False, project__isnull=False, seconds__gt=0,
                               profile__is_active=True, project__is_active=True)
                       .order_by('-date', '-id'))

        if user.is_superuser:
            return time_report
        return time_report.filter(Q(profile__user=user) | Q(project__in=user.profile.project_set.all()))

    def get_profiles_reports(self, request):
        filter_sql = ""
        params = []
        filter_from = self.request.query_params.get('from', None)
        filter_to = self.request.query_params.get('to', None)

        if filter_from is not None:
            params.append(filter_from)
            filter_sql += " AND `time_tracker_timereport`.`date` >= %s"

        if filter_to is not None:
            params.append(filter_to)
            filter_sql += " AND `time_tracker_timereport`.`date` <= %s"

        sql = ("SELECT `time_tracker_timereport`.`id`, `time_tracker_timereport`.`name`, SUM(`time_tracker_timereport`.`seconds`) as `seconds` "
               "FROM `time_tracker_timereport` "
               "INNER JOIN `time_tracker_profile` ON (`time_tracker_timereport`.`profile_id` = `time_tracker_profile`.`id`) "
               "INNER JOIN `time_tracker_project` ON (`time_tracker_timereport`.`project_id` = `time_tracker_project`.`id`) "
               "WHERE (`time_tracker_timereport`.`seconds` > 0 "
               + filter_sql +
               "AND `time_tracker_timereport`.`is_active` = True "
               "AND `time_tracker_timereport`.`profile_id` IS NOT NULL "
               "AND `time_tracker_project`.`is_active` = True "
               "AND `time_tracker_timereport`.`project_id` IS NOT NULL "
               "AND `time_tracker_profile`.`is_active` = True) "
               "GROUP BY `time_tracker_timereport`.`profile_id` "
               "ORDER BY `time_tracker_timereport`.`date` DESC, `time_tracker_timereport`.`id` DESC ")

        time_report = (TimeReport.objects.raw(sql, params))
        serializer = TimeReportSerializer(time_report, many=True)
        return Response(serializer.data)

    def get_projects_reports(self, request):
        filter_sql = ""
        params = []
        filter_from = self.request.query_params.get('from', None)
        filter_to = self.request.query_params.get('to', None)

        if filter_from is not None:
            params.append(filter_from)
            filter_sql += " AND `time_tracker_timereport`.`date` >= %s"

        if filter_to is not None:
            params.append(filter_to)
            filter_sql += " AND `time_tracker_timereport`.`date` <= %s"

        sql = (
            "SELECT `time_tracker_timereport`.`id`, `time_tracker_timereport`.`name`, SUM(`time_tracker_timereport`.`seconds`) as `seconds` "
            "FROM `time_tracker_timereport` "
            "INNER JOIN `time_tracker_profile` ON (`time_tracker_timereport`.`profile_id` = `time_tracker_profile`.`id`) "
            "INNER JOIN `time_tracker_project` ON (`time_tracker_timereport`.`project_id` = `time_tracker_project`.`id`) "
            "WHERE (`time_tracker_timereport`.`seconds` > 0 "
            + filter_sql +
            "AND `time_tracker_timereport`.`is_active` = True "
            "AND `time_tracker_timereport`.`profile_id` IS NOT NULL "
            "AND `time_tracker_project`.`is_active` = True "
            "AND `time_tracker_timereport`.`project_id` IS NOT NULL "
            "AND `time_tracker_profile`.`is_active` = True) "
            "GROUP BY `time_tracker_timereport`.`project_id` "
            "ORDER BY `time_tracker_timereport`.`date` DESC, `time_tracker_timereport`.`id` DESC ")

        time_report = (TimeReport.objects.raw(sql, params))
        serializer = TimeReportSerializer(time_report, many=True)
        return Response(serializer.data)
