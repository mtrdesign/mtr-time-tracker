from rest_framework import serializers

from time_tracker.models import Project

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ("id", "name",)