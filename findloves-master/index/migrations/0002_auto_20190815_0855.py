# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2019-08-15 08:55
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='basicinfo',
            name='uid',
            field=models.ForeignKey(auto_created=True, on_delete=django.db.models.deletion.CASCADE, to='index.Accountinfo'),
        ),
    ]