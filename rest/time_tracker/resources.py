from import_export import resources
from import_export import fields
from time_tracker.models.time_report import TimeReport


class TimeReportResource(resources.ModelResource):
    name = fields.Field('name')
    profile = fields.Field('profile')
    project = fields.Field('project')
    hours = fields.Field('custom_hours')
    date = fields.Field('date')
    description = fields.Field('description')


    class Meta:
        fields = ('name', 'profile', 'project', 'hours', 'date', 'description')
        export_order = ('date', 'project', 'name', 'profile', 'description', 'hours')
        model = TimeReport