from rest_framework import serializers

from time_tracker.models import Profile
from time_tracker.models import Project
from time_tracker.models import TimeReport
from time_tracker.serializers import ProfileSerializer
from time_tracker.serializers import ProjectSerializer


class TimeReportSerializer(serializers.HyperlinkedModelSerializer):
    profile_entry = ProfileSerializer(source="profile", many=False, read_only=True)
    project_entry = ProjectSerializer(source="project", many=False, read_only=True)
    profile = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all(), many=False, read_only=False)
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), many=False, read_only=False)
    
    class Meta:
        model = TimeReport
        fields = ("id", "name", "date", "description", "get_hours", "seconds", "profile_entry", "project_entry", 
                  "profile", "project",)
