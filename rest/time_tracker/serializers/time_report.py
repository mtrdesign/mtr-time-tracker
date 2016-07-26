from django.utils.translation import ugettext as _

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

    name = serializers.CharField()
    seconds = serializers.IntegerField()

    class Meta:
        model = TimeReport
        fields = ("id", "name", "date", "description", "hours", "seconds", "profile_entry", "project_entry",
                  "profile", "project",)

    def validate_name(self, value):
        if len(value) < 5:
            raise serializers.ValidationError(_("Name must be greater than 5 characters."))
        return value

    def validate_seconds(self, value):
        if value < 60:
            raise serializers.ValidationError(_("Duration must be greater than 1 minute."))
        if value > 86400:
            raise serializers.ValidationError(_("Duration must be lower than 24 hours."))
        return value


class TimeReportProfileSerializer(serializers.Serializer):
    profile = serializers.SerializerMethodField(source='get_profile')
    total_seconds = serializers.ReadOnlyField()

    def get_profile(self, obj):
        return ProfileSerializer(Profile.objects.get(id=obj['profile'])).data


class TimeReportProjectSerializer(serializers.Serializer):
    project = serializers.SerializerMethodField(source='get_project')
    total_seconds = serializers.ReadOnlyField()

    def get_project(self, obj):
        return ProjectSerializer(Project.objects.get(id=obj['project'])).data
