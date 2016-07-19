from rest_framework import viewsets

from time_tracker.models import Project
from time_tracker.serializers import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
