from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext as _

from companies.models import Companies


class Profiles(models.Model):
    user = models.OneToOneField(User, verbose_name=_("User"), unique=False,
                                null=True, blank=False, 
                                on_delete=models.PROTECT)
    company = models.OneToOneField(Companies, verbose_name=_("Company"),
                                   null=True, blank=False, 
                                   on_delete=models.PROTECT)
    first_name = models.CharField(verbose_name=_("First name"), max_length=254,
                                 unique=False, null=True, blank=False)
    last_name = models.CharField(verbose_name=_("Last name"), max_length=254,
                                 unique=False, null=True, blank=False)
    job_title = models.CharField(verbose_name=_("Job title"), max_length=254,
                                 unique=False, null=True, blank=True)
    phone_number = models.CharField(verbose_name=_("Phone number"),
                                    max_length=254, unique=False, null=True,
                                    blank=True)
    is_active = models.BooleanField(verbose_name=_("Is active"), default=True)
    created_at = models.DateTimeField(verbose_name=_("Created at"),
                                      auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=_("Updated at"),
                                      auto_now=True)

    class Meta(object):
        verbose_name = _('profile')
        verbose_name_plural = _('profiles')
        ordering = ('first_name', 'last_name',)

    def __str__(self):
        return self.get_full_name()

    def get_full_name(self):
        return "%s %s" % (self.first_name, self.last_name)
