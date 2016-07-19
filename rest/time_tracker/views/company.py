from rest_framework import viewsets

from time_tracker.models import Company
from time_tracker.serializers import CompanySerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
