from django.contrib import admin

from time_tracker.models import Company
from time_tracker.models import Profile
from time_tracker.models import Project
from time_tracker.models import TimeReport

from time_tracker.admin.company import CompanyAdmin
from time_tracker.admin.profile import ProfileAdmin
from time_tracker.admin.project import ProjectAdmin
from time_tracker.admin.time_report import TimeReportAdmin


admin.site.register(Company, CompanyAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(TimeReport, TimeReportAdmin)