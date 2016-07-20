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
        if user.is_superuser:
            return TimeReport.objects.filter(is_active=True)
        return TimeReport.objects.filter(profile__user=user, is_active=True)
