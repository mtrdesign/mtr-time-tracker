# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-20 09:57
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('time_tracker', '0003_profile_email_address'),
    ]

    operations = [
        migrations.CreateModel(
            name='TimeReport',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=254, unique=True, verbose_name='Name')),
                ('description', models.CharField(blank=True, max_length=1024, null=True, verbose_name='Description')),
                ('seconds', models.IntegerField(null=True, verbose_name='Hours')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is active')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('project', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='time_tracker.Project', verbose_name='Project')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'verbose_name_plural': 'time reports',
                'verbose_name': 'time report',
            },
        ),
    ]
