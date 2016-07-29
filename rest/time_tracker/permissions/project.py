from rest_framework import permissions


class ProjectPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        user = request.user
        if view.action in ['retrieve']:
            return user.is_superuser or user.profile in obj.profiles.all()
        else:
            return False
