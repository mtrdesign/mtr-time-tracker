from rest_framework import serializers

from time_tracker.models import TimeReport
from time_tracker.serializers import ProfileSerializer


class TimeReportSerializer(serializers.HyperlinkedModelSerializer):
    profile = ProfileSerializer(many=False, read_only=True)
    
    class Meta:
        model = TimeReport
        fields = ("id", "name", "date", "description", "get_hours", "profile",)
