from rest_framework import permissions


class CompanyPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action == 'list':
            return True
        elif view.action == 'create':
            return True
        elif view.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.is_superuser:
            return True
        elif view.action == 'retrieve':
            return True
        elif view.action in ['update', 'partial_update', 'destroy']:
            return True
        else:
            return False