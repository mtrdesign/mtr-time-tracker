from rest_framework import filters
from rest_framework import viewsets

from time_tracker.models import Project
from time_tracker.serializers import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('is_finished',)

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Project.objects.filter(is_active=True)
        return Project.objects.filter(profiles__user=user, is_active=True)
