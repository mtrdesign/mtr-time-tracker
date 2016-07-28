from django.contrib.auth.models import User

from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from time_tracker.serializers import UserSerializer
from time_tracker.permissions import UserPermission


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (UserPermission,)

    def get_queryset(self):
        user = User.objects.filter(is_active=True, id=self.request.user.id)
        return user

    @detail_route(methods=["post"])
    def set_password(self, request, pk=None):
        user = self.get_object()
        current_password = request.data["current_password"]
        new_password = request.data["new_password"]
        confirm_new_password = request.data["confirm_new_password"]
        if user.check_password(current_password) is False:
            return Response({"current_password": "doesn't match with the existing profile password."})
        if len(new_password) > 6 and new_password == confirm_new_password:
            user.set_password(new_password);
            user.save()
            return Response({"id": user.id})
        else:
            return Response({"new_password": "must be of minimum 6 characters length."})