from rest_framework import viewsets

from time_tracker.models import TimeReport
from time_tracker.serializers import TimeReportSerializer


class TimeReportViewSet(viewsets.ModelViewSet):
    queryset = TimeReport.objects.all()
    serializer_class = TimeReportSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return TimeReport.objects.filter(is_active=True)
        return TimeReport.objects.filter(profile__user=user, is_active=True)
