from rest_framework import serializers

from time_tracker.models import Profile
from time_tracker.serializers import UserSerializer
from time_tracker.serializers import CompanySerializer

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    user_entry = UserSerializer(source='user')
    company_entry = CompanySerializer(source='company')
    
    class Meta:
        model = Profile
        fields = ("id", "first_name", "last_name", "user_entry", "company_entry",)
