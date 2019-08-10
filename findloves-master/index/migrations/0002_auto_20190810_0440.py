# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2019-08-10 04:40
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='basicinfo',
            options={'verbose_name': '用户信息', 'verbose_name_plural': '用户信息'},
        ),
        migrations.AddField(
            model_name='basicinfo',
            name='uid',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='index.Accountinfo'),
        ),
        migrations.AlterField(
            model_name='basicinfo',
            name='ageday',
            field=models.IntegerField(verbose_name='天'),
        ),
        migrations.AlterField(
            model_name='basicinfo',
            name='agemonth',
            field=models.IntegerField(verbose_name='月'),
        ),
        migrations.AlterField(
            model_name='basicinfo',
            name='ageyear',
            field=models.IntegerField(verbose_name='年'),
        ),
        migrations.AlterField(
            model_name='basicinfo',
            name='education',
            field=models.CharField(max_length=10, verbose_name='学历'),
        ),
        migrations.AlterField(
            model_name='basicinfo',
            name='gender',
            field=models.CharField(max_length=5, verbose_name='性别'),
        ),
        migrations.AlterField(
            model_name='basicinfo',
            name='height',
            field=models.IntegerField(verbose_name='身高'),
        ),
        migrations.AlterField(
            model_name='basicinfo',
            name='homepage',
            field=models.CharField(blank=True, max_length=30, null=True, verbose_name='微博/博客'),
        ),
        migrations.AlterField(
            model_name='basicinfo',
            name='idnumber',
            field=models.CharField(blank=True, max_length=18, null=True, verbose_name='身份证号码'),
        ),
        migrations.AlterField(
            model_name='basicinfo',
            name='lovesort',
            field=models.CharField(max_length=10, verbose_name='交友类型'),
        ),
        migrations.AlterField(
            model_name='basicinfo',
            name='marrystat',
            field=models.CharField(max_length=10, verbose_name='婚姻状况'),
        ),
        migrations.AlterField(
            model_name='basicinfo',
            name='province',
            field=models.CharField(max_length=10, verbose_name='所在地区'),
        ),
        migrations.AlterField(
            model_name='basicinfo',
            name='qq',
            field=models.CharField(blank=True, max_length=15, null=True, verbose_name='QQ号码'),
        ),
        migrations.AlterField(
            model_name='basicinfo',
            name='weight',
            field=models.IntegerField(verbose_name='体重'),
        ),
    ]