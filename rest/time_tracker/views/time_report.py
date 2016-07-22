from rest_framework import filters
from rest_framework import viewsets

from time_tracker.models import TimeReport
from time_tracker.serializers import TimeReportSerializer


class TimeReportViewSet(viewsets.ModelViewSet):
    queryset = TimeReport.objects.all()
    serializer_class = TimeReportSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('project__id',)
    
    def get_queryset(self):
        user = self.request.user
        time_report = (TimeReport.objects
                       .filter(is_active=True, profile__isnull=False, project__isnull=False, seconds__gt=0,
                               profile__is_active=True, project__is_active=True)
                       .order_by('-date'))
        if user.is_superuser:
            return time_report
        return time_report.filter(profile__user=user)
