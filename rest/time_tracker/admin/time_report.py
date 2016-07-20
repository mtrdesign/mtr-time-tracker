from django.contrib import admin


class TimeReportAdmin(admin.ModelAdmin):
    search_fields = ("id", "name",)
    ordering = ("name",)
    list_display = ("id", "name", "_get_hours", "is_active",)
    list_filter = ("profile", "project", "is_active",)
    
    def _get_hours(self, obj):
        return obj.get_hours()
        
    _get_hours.short_description = "Hours"