from django.contrib import admin


class CompanyAdmin(admin.ModelAdmin):
    search_fields = ("id", "name", "email_address",)
    ordering = ("name",)
    list_display = ("id", "name", "email_address", "is_active",)
    list_filter = ("profile", "is_active",)
