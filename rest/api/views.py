from companies.models import Companies
from projects.models import Projects
from profiles.models import Profiles

from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route

from api.serializers import CompaniesSerializer, ProjectsSerializer, ProfilesSerializer


class CompaniesViewSet(viewsets.ModelViewSet):
    queryset = Companies.objects.all()
    serializer_class = CompaniesSerializer

class ProjectsViewSet(viewsets.ModelViewSet):
    queryset = Projects.objects.all()
    serializer_class = ProjectsSerializer

class ProfilesViewSet(viewsets.ModelViewSet):
    queryset = Profiles.objects.all()
    serializer_class = ProfilesSerializer
    
    @list_route(methods=['get'], url_path='by_user_id/(?P<pk>[^/.]+)')
    def by_user_id(self, request, pk=None):
        queryset = Profiles.objects.all()
        user = get_object_or_404(queryset, user_id=pk)
        serializer = ProfilesSerializer(user)
        return Response(serializer.data)

