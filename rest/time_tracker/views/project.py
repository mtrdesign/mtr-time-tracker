from rest_framework import filters
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from time_tracker.models import Project
from time_tracker.serializers import ProjectSerializer
from time_tracker.permissions import ProjectPermission


class ProjectViewSet(viewsets.ModelViewSet):
    """
        Working with project data

        retrieve:
        Return the given project.

        list:
        Return a list of all the existing project.

    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (ProjectPermission,)
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    filter_fields = ('is_finished',)
    ordering_fields = ('name',)
    ordering = ('name',)

    def get_queryset(self):
        user = self.request.user
        project = Project.objects.filter(is_active=True)
        if user.is_superuser:
            return project
        return project.filter(profiles__user=user)
