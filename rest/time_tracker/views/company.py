from rest_framework import viewsets

from time_tracker.models import Company
from time_tracker.serializers import CompanySerializer
from time_tracker.permissions import CompanyPermission


class CompanyViewSet(viewsets.ModelViewSet):
    """
        Working with company data

        retrieve:
        Return the given company.

    """
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = (CompanyPermission,)
    
    def get_queryset(self):
        user = self.request.user
        company = Company.objects.filter(is_active=True)
        if user.is_superuser:
            return company
        return company.filter(profile__user=user)
