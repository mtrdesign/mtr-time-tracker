from companies.models import Companies
from projects.models import Projects
from profiles.models import Profiles
from django.contrib.auth.models import User

from rest_framework import serializers


class UsersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email",)

class CompaniesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Companies
        fields = ("id", "name",)

class ProjectsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Projects
        fields = ("id", "name",)

class ProfilesSerializer(serializers.HyperlinkedModelSerializer):
    user_entry = UsersSerializer(source='user')
    company_entry = CompaniesSerializer(source='company')
    
    class Meta:
        model = Profiles
        fields = ("id", "first_name", "last_name", "user_entry", "company_entry",)