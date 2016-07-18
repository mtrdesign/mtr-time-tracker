from rest_framework import serializers

from time_tracker.models import Company


class CompanySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Company
        fields = ("id", "name",)