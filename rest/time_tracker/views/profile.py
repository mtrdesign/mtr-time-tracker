from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route

from time_tracker.models import Profile
from time_tracker.serializers import ProfileSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    
    @list_route(methods=['get'], url_path='by_user_id/(?P<pk>[^/.]+)')
    def by_user_id(self, request, pk=None):
        queryset = Profile.objects.all()
        user = get_object_or_404(queryset, user_id=pk)
        serializer = ProfileSerializer(user)
        return Response(serializer.data)