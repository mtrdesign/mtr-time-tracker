from rest_framework import serializers

from time_tracker.models import Profile
from time_tracker.serializers import UserSerializer
from time_tracker.serializers import CompanySerializer


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=False)
    company = CompanySerializer(many=False, read_only=False)

    class Meta:
        model = Profile
        exclude = ('is_active', 'created_at', 'updated_at')
