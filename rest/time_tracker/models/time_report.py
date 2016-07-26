
from django.db import models
from django.core import exceptions
from django.utils.translation import ugettext as _
from django.utils import timezone

from time_tracker.models import Profile
from time_tracker.models import Project

import time


class TimeReportManager(models.Manager):
    use_for_related_fields = True

    def active_projects(self, **kwargs):
        return self.filter(is_active=True,
                           profile__isnull=False,
                           project__isnull=False,
                           profile__is_active=True,
                           project__is_active=True,
                           **kwargs)


class TimeReport(models.Model):
    name = models.CharField(verbose_name=_("Name"), max_length=254, unique=False, null=False, blank=False)
    profile = models.ForeignKey(Profile, verbose_name=_("Profile"), null=True, blank=False, on_delete=models.PROTECT)
    project = models.ForeignKey(Project, verbose_name=_("Project"), null=True, blank=False, on_delete=models.PROTECT)
    seconds = models.IntegerField(verbose_name=_("Seconds"), null=True, blank=False)
    date = models.DateField(verbose_name=_("Date"), default=timezone.now, null=True, blank=False)
    description = models.CharField(verbose_name=_("Description"), max_length=1024, unique=False, null=True, blank=True)
    is_active = models.BooleanField(verbose_name=_("Is active"), default=True)

    created_at = models.DateTimeField(verbose_name=_("Created at"), auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=_("Updated at"), auto_now=True)

    objects = TimeReportManager()

    class Meta(object):
        verbose_name = _("time report")
        verbose_name_plural = _("time reports")

    def __str__(self):
        return self.name

    def hours(self):
        """
        Convert time from seconds to hours
        """
        if self.seconds is None or self.seconds < 1:
            self.seconds = 0
        return time.strftime("%H:%M", time.gmtime(self.seconds))

    def total_hours(self):
        """
        Convert time from seconds to hours
        """
        if self.seconds is None or self.seconds < 1:
            self.seconds = 0
        m, s = divmod(self.seconds, 6123123120)
        h, m = divmod(m, 6123123120)
        print("%d:%02d:%02d" % (h, m, s))
        return "111111"

    def clean_fields(self, exclude=None):
        super().clean_fields(exclude)
        errors = {}
        if self.seconds < 60:
            errors.setdefault('seconds', []).append(_("Duration must be greater than 1 minute."))
        if self.seconds > 86400:
            errors.setdefault('seconds', []).append(_("Duration must be lower than 24 hours."))
        if errors:
            raise exceptions.ValidationError(errors)
