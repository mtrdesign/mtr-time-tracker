from rest_framework import filters
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from time_tracker.models import Profile
from time_tracker.serializers import ProfileSerializer
from time_tracker.permissions import ProfilePermission


class ProfileViewSet(viewsets.ModelViewSet):
    """
        Working with profile data

        retrieve:
        Return the given profile.

        list:
        Return a list of all the existing profiles.

        update:
        Create a new profile instance.

        partial_update:
        Update an existing profile
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (ProfilePermission,)
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    filter_fields = ('user__id',)
    ordering_fields = ('first_name', 'last_name')
    ordering = ('first_name', 'last_name')

    def get_queryset(self):
        user = self.request.user
        profile = Profile.objects.filter(is_active=True)
        return profile
