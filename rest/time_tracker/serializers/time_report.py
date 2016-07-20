from rest_framework import serializers

from time_tracker.models import TimeReport


class TimeReportSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TimeReport
        fields = ("id", "name", "description", "get_hours",)
