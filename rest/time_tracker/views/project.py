from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route

from time_tracker.models import Project
from time_tracker.serializers import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    
    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(profiles__user=user).all()
