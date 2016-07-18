from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class TimeTrackerConfig(AppConfig):
    name = "time_tracker"
    verbose_name = _("Time tracker")
