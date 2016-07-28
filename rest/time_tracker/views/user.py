from django.contrib.auth.models import User

from rest_framework import viewsets

from time_tracker.serializers import UserSerializer
from time_tracker.permissions import UserPermission


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (UserPermission,)

    def get_queryset(self):
        user = User.objects.filter(is_active=True, id=self.request.user.id)
        return user