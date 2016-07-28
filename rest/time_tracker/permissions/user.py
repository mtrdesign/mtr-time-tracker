from rest_framework import permissions


class UserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action in ['partial_update']:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        user = request.user
        if view.action in ['partial_update']:
            return obj == user
        else:
            return False