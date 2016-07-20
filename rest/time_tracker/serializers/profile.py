from rest_framework import serializers

from time_tracker.models import Profile
from time_tracker.serializers import UserSerializer
from time_tracker.serializers import CompanySerializer


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=False)
    company = CompanySerializer(many=False, read_only=False)

    class Meta:
        model = Profile
        fields = ("id", "first_name", "last_name", "full_name", "email_address", "job_title", "phone_number", 
                  "user", "company",)
