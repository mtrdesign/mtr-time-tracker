from django.contrib import admin


class ProjectAdmin(admin.ModelAdmin):
    search_fields = ("id", "name",)
    ordering = ("name",)
    list_display = ("name", "is_finished", "is_active",)
    list_filter = ("profiles", "is_finished", "is_active",)