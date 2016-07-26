from django.db.models import Q, Sum

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


        time_report = self.filter_params(time_report)

        if user.is_superuser:
            return time_report
        return time_report.filter(Q(profile__user=user) | Q(project__in=user.profile.project_set.all()))

    def get_profiles_reports(self, request):
        """
            Get total profiles hours for given filter
        """
        # Need to group by 'profile_id'
        time_report = (TimeReport.objects
                       .filter(is_active=True, profile__isnull=False, project__isnull=False, seconds__gt=0,
                               profile__is_active=True, project__is_active=True)
                       .annotate(Sum('seconds'))
                       .order_by('-date', '-id'))

        time_report = self.filter_params(time_report)

        serializer = TimeReportSerializer(time_report, many=True)
        return Response(serializer.data)

    def get_projects_reports(self, request):
        """
            Get total projects hours for given filter
        """
        # Need to group by 'project_id'
        time_report = (TimeReport.objects
                       .filter(is_active=True, profile__isnull=False, project__isnull=False, seconds__gt=0,
                               profile__is_active=True, project__is_active=True)
                       .annotate(Sum('seconds'))
                       .order_by('-date', '-id'))

        time_report = self.filter_params(time_report)

        serializer = TimeReportSerializer(time_report, many=True)
        return Response(serializer.data)

    def get_total_hours(self, request):
        """
            Get total hours for given filter
        """
        time_report = (TimeReport.objects
                       .filter(is_active=True, profile__isnull=False, project__isnull=False, seconds__gt=0,
                               profile__is_active=True, project__is_active=True)
                       .annotate(Sum('seconds'))
                       .order_by('-date', '-id'))

        time_report = self.filter_params(time_report)

        serializer = TimeReportSerializer(time_report)
        return Response(serializer.data)

    def filter_params(self, time_report):
        """
            Create filers
        """
        filter_from = self.request.query_params.get('from', None)
        filter_to = self.request.query_params.get('to', None)

        if filter_from is not None:
            time_report = time_report.filter(date__gte=filter_from)

        if filter_to is not None:
            time_report = time_report.filter(date__lte=filter_to)

        return time_report