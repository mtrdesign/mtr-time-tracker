from django.contrib import admin

from companies.models import Companies


class CompaniesAdmin(admin.ModelAdmin):
    search_fields = ("id", "name", "email_address",)
    ordering = ("name",)
    list_display = ("id", "name", "email_address", "is_active",)
    list_filter = ("profiles",)

admin.site.register(Companies, CompaniesAdmin)
