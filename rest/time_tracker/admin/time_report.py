from django.contrib import admin
from django.contrib.admin import DateFieldListFilter
from import_export.admin import ExportMixin
from rangefilter.filter import DateRangeFilter
from time_tracker.resources import TimeReportResource

from django.contrib import admin

from django_admin_multiple_choice_list_filter.list_filters import MultipleChoiceListFilter

from time_tracker.models.time_report import TimeReport
from time_tracker.models.profile import Profile
from time_tracker.models.project import Project

class NamesFilter(MultipleChoiceListFilter):
    title = 'Profile' 
    parameter_name = 'profile__in' 
    
    def lookups(self, request, model_admin):
        return [(profile.id,profile.full_name) for profile in Profile.objects.order_by('first_name', 'last_name').all()]

class ProjectFilter(MultipleChoiceListFilter):
    title = 'Project' 
    parameter_name = 'project__in' 
    
    def lookups(self, request, model_admin):
        return [(project.id,project.name) for project in Project.objects.order_by('name').all()]

class TimeReportAdmin(ExportMixin, admin.ModelAdmin):
    search_fields = ("id", "name",)
    ordering = ("-date",)
    list_display = ("date", "project_name", "profile_full_name", "name", "hours", "is_active",)
    list_filter = (('date', DateRangeFilter), NamesFilter,ProjectFilter, "is_active",)
    resource_class = TimeReportResource

    def profile_full_name(self, obj):
        if obj.profile:
            return obj.profile.full_name

    def project_name(self, obj):
        if obj.project:
            return obj.project.name

    profile_full_name.short_description = 'Profile'
    project_name.short_description = 'Project'

