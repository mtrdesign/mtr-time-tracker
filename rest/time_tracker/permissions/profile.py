from rest_framework import permissions


class ProfilePermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve', 'update', 'partial_update']:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.is_superuser:
            return True
        elif view.action in ['retrieve']:
            return True
        elif view.action in ['update', 'partial_update']:
            return obj == user.profile
        else:
            return False
