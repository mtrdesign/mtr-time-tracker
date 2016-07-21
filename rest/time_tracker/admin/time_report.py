from django.contrib import admin


class TimeReportAdmin(admin.ModelAdmin):
    search_fields = ("id", "name",)
    ordering = ("date",)
    list_display = ("id", "date", "name", "hours", "is_active",)
    list_filter = ("profile", "project", "is_active",)
