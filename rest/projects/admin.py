from django.contrib import admin

from projects.models import Projects


class ProjectsAdmin(admin.ModelAdmin):
    search_fields = ("id", "name",)
    ordering = ("name",)
    list_display = ("id", "name", "is_active",)
    list_filter = ("profiles",)

admin.site.register(Projects, ProjectsAdmin)
