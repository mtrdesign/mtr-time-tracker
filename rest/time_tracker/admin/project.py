from django.contrib import admin


class ProjectAdmin(admin.ModelAdmin):
    search_fields = ("id", "name",)
    ordering = ("name",)
    list_display = ("id", "name", "is_active",)
    list_filter = ("profiles", "is_active",)