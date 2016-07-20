from django.contrib.auth.models import User

from rest_framework import viewsets

from time_tracker.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return User.objects.filter(is_active=True)
        return User.objects.filter(id=user.id, is_active=True)
