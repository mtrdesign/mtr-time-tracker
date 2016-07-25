from rest_framework import serializers

from time_tracker.models import Company


class CompanySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Company
        fields = ("id", "name", "email_address", "phone_number", "fax_number", "website_url", "address",)
