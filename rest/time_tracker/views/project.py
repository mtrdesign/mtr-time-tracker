from rest_framework import filters
from rest_framework import viewsets

from time_tracker.models import Project
from time_tracker.serializers import ProjectSerializer
from time_tracker.permissions import ProjectPermission


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (ProjectPermission,)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('is_finished',)

    def get_queryset(self):
        user = self.request.user
        project = Project.objects.filter(is_active=True)
        if user.is_superuser:
            return project
        return project.filter(profiles__user=user)
