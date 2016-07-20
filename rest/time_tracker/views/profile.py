from rest_framework import filters
from rest_framework import viewsets

from time_tracker.models import Profile
from time_tracker.serializers import ProfileSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('user__id',)
    
    def get_queryset(self):
        user = self.request.user
        return Profile.objects.filter(user=user, is_active=True).all()
