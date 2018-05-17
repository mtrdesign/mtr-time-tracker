from django.contrib import admin
from django.contrib.admin import DateFieldListFilter
from import_export.admin import ExportMixin
from rangefilter.filter import DateRangeFilter
from time_tracker.resources import TimeReportResource


class TimeReportAdmin(ExportMixin, admin.ModelAdmin):
    search_fields = ("id", "name",)
    ordering = ("date",)
    list_display = ("date", "project_name", "profile_full_name", "name", "hours", "is_active",)
    list_filter = (('date', DateRangeFilter), "profile", "project", "is_active",)
    resource_class = TimeReportResource

    def profile_full_name(self, obj):
        if obj.profile:
            return obj.profile.full_name

    def project_name(self, obj):
        if obj.project:
            return obj.project.name

    profile_full_name.short_description = 'Profile'
    project_name.short_description = 'Project'
