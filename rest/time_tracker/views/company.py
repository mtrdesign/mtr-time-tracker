from rest_framework import viewsets

from time_tracker.models import Company
from time_tracker.serializers import CompanySerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Company.objects.filter(is_active=True)
        return Company.objects.filter(profile__user=user, is_active=True)
