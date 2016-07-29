from rest_framework import permissions


class CompanyPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action in ['retrieve']:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        if view.action in ['retrieve']:
            return True
        else:
            return False
