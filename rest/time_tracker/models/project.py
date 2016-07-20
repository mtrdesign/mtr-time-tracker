from django.db import models
from django.utils.translation import ugettext as _

from time_tracker.models import Profile


class Project(models.Model):
    name = models.CharField(verbose_name=_("Name"), max_length=254, unique=True, null=False, blank=False)
    profiles = models.ManyToManyField(Profile, verbose_name=_("Profiles"), blank=True)
    description = models.CharField(verbose_name=_("Description"), max_length=512, unique=False, null=True, blank=True)
    is_finished = models.BooleanField(verbose_name=_("Is finished"), default=False)
    is_active = models.BooleanField(verbose_name=_("Is active"), default=True)

    created_at = models.DateTimeField(verbose_name=_("Created at"), auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=_("Updated at"), auto_now=True)

    class Meta(object):
        verbose_name = _("project")
        verbose_name_plural = _("projects")

    def __str__(self):
        return self.name
