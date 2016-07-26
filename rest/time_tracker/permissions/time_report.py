from rest_framework import permissions


class TimeReportPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'create', 'retrieve', 'update', 'partial_update', 'destroy', 'get_profiles_reports',
                           'get_projects_reports', 'get_total_hours' ]:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.is_superuser:
            return True
        elif view.action == 'retrieve':
            return obj.profile == user.profile or obj.project in user.profile.project_set.all()
        elif view.action in ['update', 'partial_update', 'destroy']:
            return obj.profile == user.profile
        else:
            return False
