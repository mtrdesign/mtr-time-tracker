import django_filters

from rest_framework import filters

from time_tracker.models import TimeReport


class TimeReportFilter(filters.FilterSet):
    date = django_filters.DateFromToRangeFilter(name="date")
    project__id = django_filters.NumberFilter(name="project__id")
    profile__id = django_filters.NumberFilter(name="profile__id")

    class Meta:
        model = TimeReport
        fields = []
