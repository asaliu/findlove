# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2019-08-11 08:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0002_auto_20190810_0440'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accountinfo',
            name='password',
            field=models.CharField(max_length=64, verbose_name='登录密码'),
        ),
    ]
