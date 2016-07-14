from django.db import models
from django.utils.translation import ugettext as _


class Companies(models.Model):
    name = models.CharField(verbose_name=_("Name"), max_length=254, unique=True, null=False, blank=False)
    email_address = models.EmailField(verbose_name=_("Email address"), max_length=254, unique=True, null=False,
                                      blank=False)
    phone_number = models.CharField(verbose_name=_("Phone number"), max_length=254, unique=False, null=True, blank=True)
    fax_number = models.CharField(verbose_name=_("Fax number"), max_length=254, unique=False, null=True, blank=True)
    website_url = models.URLField(verbose_name=_("Website"), max_length=254, unique=False, null=True, blank=True)
    address = models.CharField(verbose_name=_("Address"), max_length=512, unique=False, null=True, blank=True)
    is_active = models.BooleanField(verbose_name=_("Is active"), default=True)
    created_at = models.DateTimeField(verbose_name=_("Created at"), auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=_("Updated at"), auto_now=True)

    class Meta(object):
        verbose_name = _("company")
        verbose_name_plural = _("companies")

    def __str__(self):
        return self.name
