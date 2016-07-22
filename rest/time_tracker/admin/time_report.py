from django.contrib import admin


class TimeReportAdmin(admin.ModelAdmin):
    search_fields = ("id", "name",)
    ordering = ("date",)
    list_display = ("date", "project_name", "profile_full_name", "name", "hours", "is_active",)
    list_filter = ("profile", "project", "is_active",)

    def profile_full_name(self, obj):
        if obj.profile:
            return obj.profile.full_name

    def project_name(self, obj):
        if obj.project:
            return obj.project.name

    profile_full_name.short_description = 'Profile'
    project_name.short_description = 'Project'
