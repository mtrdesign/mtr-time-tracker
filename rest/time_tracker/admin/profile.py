from django.contrib import admin


class ProfileAdmin(admin.ModelAdmin):
    search_fields = ("id", "first_name", "last_name", "user__email",)
    ordering = ("first_name", "last_name",)
    list_display = ("id", "__str__", "job_title", "company", "is_active",)
    list_filter = ("company", "project",)
