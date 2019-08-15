from django.db import models

# Create your models here.
class Accountinfo(models.Model):
    username=models.CharField('用户名',max_length=30)
    password=models.CharField('登录密码',max_length=70)
    email=models.EmailField('登录邮箱',max_length=40)

class Basicinfo(models.Model):
    uid = models.ForeignKey('Accountinfo', on_delete=models.CASCADE)
    gender=models.CharField('性别',max_length=5)
    ageday=models.IntegerField('天')
    ageyear=models.IntegerField('年')
    agemonth=models.IntegerField('月')
    marrystat=models.CharField('婚姻状况',max_length=10)
    education=models.CharField('学历',max_length=10)
    height=models.IntegerField('身高')
    weight=models.IntegerField('体重')
    province=models.CharField('所在地区',max_length=10)
    lovesort=models.CharField('交友类型',max_length=10)

    qq=models.CharField('QQ号码',max_length=15,null=True,blank=True)
    homepage=models.CharField('微博/博客',max_length=30,null=True,blank=True)
    idnumber=models.CharField('身份证号码',max_length=18,null=True,blank=True)

    class Meta:
        verbose_name = '用户信息'
        verbose_name_plural = verbose_name
