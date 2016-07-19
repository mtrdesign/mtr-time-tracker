from django.contrib.auth.models import User

from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route

from time_tracker.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(id=user.id).all()
