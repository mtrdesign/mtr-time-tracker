from django.db.models import Q, Sum, F, Func, Max, Min

from rest_framework import filters
from rest_framework import viewsets
from rest_framework.response import Response

from time_tracker.models import TimeReport
from time_tracker.serializers import TimeReportSerializer
from time_tracker.permissions import TimeReportPermission
from time_tracker.filters.time_report_filter import TimeReportFilter
from time_tracker.serializers import TimeReportProfileSerializer
from time_tracker.serializers import TimeReportProjectSerializer
from django_filters.rest_framework import DjangoFilterBackend


class TimeReportViewSet(viewsets.ModelViewSet):
    """
        Working with TimeReport data

        retrieve:
        Return the given time report.

        list:
        Return a list of all the existing time report.

        create:
        Create a new time report.

        update:
        Create a new time report instance.

        partial_update:
        Update an existing time report

        destroy:
        Delete an existing time report

    """

    queryset = TimeReport.objects.all()
    serializer_class = TimeReportSerializer
    permission_classes = (TimeReportPermission,)
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    filter_class = TimeReportFilter
    ordering_fields = ('date', 'id')
    ordering = ('-date', '-id')

    def get_queryset(self):
        user = self.request.user
        time_report = TimeReport.objects.active_projects(user, seconds__gt=0)
        return time_report

    def get_profiles_reports(self, request):
        """
        Get total profiles hours for given filter
        """
        user = self.request.user
        time_report = TimeReportFilter(request.GET, queryset=TimeReport.objects.total_time_by(user, 'profile', 'profile__first_name'))

        serializer = TimeReportProfileSerializer(time_report.qs, many=True)
        return Response(serializer.data)

    def get_projects_reports(self, request):
        """
        Get total projects hours for given filter
        """
        user = self.request.user
        time_report = TimeReportFilter(request.GET, queryset=TimeReport.objects.total_time_by(user, 'project', 'project__name'))

        serializer = TimeReportProjectSerializer(time_report.qs, many=True)
        return Response(serializer.data)

    def get_total_hours(self, request):
        """
        Get total hours for given filter
        """
        user = self.request.user
        time_report = TimeReportFilter(request.GET, queryset=TimeReport.objects.active_projects(user, seconds__gt=0))
        time_report = time_report.qs.aggregate(total_seconds=Sum('seconds'))
        time_report['total_hours'] = TimeReport.sec_to_hours(time_report['total_seconds'])
        return Response(time_report)
