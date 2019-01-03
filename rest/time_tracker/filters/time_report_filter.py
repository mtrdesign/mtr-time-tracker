import django_filters.rest_framework
from django.db.models import F, Func

from time_tracker.models import TimeReport


class TimeReportFilter(django_filters.rest_framework.FilterSet):
    FILTERS = ['MONTH', "YEAR", "DAY"]

    date = django_filters.DateFromToRangeFilter(field_name="date")
    project__id = django_filters.NumberFilter(field_name="project__id")
    profile__id = django_filters.NumberFilter(field_name="profile__id")
    group_by = django_filters.CharFilter(method='filter_group_by')

    class Meta:
        model = TimeReport
        fields = []

    def filter_group_by(self, queryset, value):
        if value in self.FILTERS:
            queryset = queryset.annotate(year=Func(F('date'), function='YEAR')).order_by('-year')

            if value == 'DAY' or value == 'MONTH':
                queryset = queryset.annotate(month=Func(F('date'), function='MONTH')).order_by('-year', '-month')
            if value == 'DAY':
                queryset = queryset.annotate(day=Func(F('date'), function='day')).order_by('-year', '-month', '-day')
        return queryset
