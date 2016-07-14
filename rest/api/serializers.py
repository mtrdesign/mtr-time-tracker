from companies.models import Companies
from projects.models import Projects
from profiles.models import Profiles

from rest_framework import serializers


class CompaniesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Companies
        fields = ("name",)

class ProjectsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Projects
        fields = ("name",)

class ProfilesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profiles
        fields = ("id", "first_name", "last_name",)