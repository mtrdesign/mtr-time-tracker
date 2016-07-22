from rest_framework import permissions


class ProjectPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action == 'list':
            return True
        elif view.action == 'create':
            return False
        elif view.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        user = request.user
        if view.action == 'retrieve':
            if user.is_superuser:
                return True
            return user.profile in obj.profiles.all()
        elif view.action in ['update', 'partial_update', 'destroy']:
            return False
        else:
            return False