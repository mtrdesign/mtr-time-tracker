import django_filters

from django.db.models import F, Func

from rest_framework import filters

from time_tracker.models import TimeReport


class TimeReportFilter(filters.FilterSet):
    FILTERS = ['MONTH', "YEAR", "DAY"]

    date = django_filters.DateFromToRangeFilter(name="date")
    project__id = django_filters.NumberFilter(name="project__id")
    profile__id = django_filters.NumberFilter(name="profile__id")
    group_by = django_filters.MethodFilter()

    class Meta:
        model = TimeReport
        fields = []

    def filter_group_by(self, queryset, value):
        if value in self.FILTERS:
            queryset = queryset.annotate(year=Func(F('date'), function='YEAR')).order_by('-year')
            if value == 'DAY' or value == 'MONTH':
                queryset = queryset.annotate(month=Func(F('date'), function='MONTH')).order_by('-month')
            if value == 'DAY':
                queryset = queryset.annotate(day=Func(F('date'), function='day')).order_by('-day')
        return queryset
