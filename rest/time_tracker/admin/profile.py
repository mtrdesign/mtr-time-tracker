from django.contrib import admin


class ProfileAdmin(admin.ModelAdmin):
    search_fields = ("id", "first_name", "last_name", "email_address",)
    ordering = ("first_name", "last_name",)
    list_display = ("id", "__str__", "email_address", "job_title", "company", "is_active",)
    list_filter = ("company", "project",)
