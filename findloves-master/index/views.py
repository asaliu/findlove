import json

from django.http import HttpResponse,HttpResponseRedirect
from django.shortcuts import render
from index.models import Accountinfo
from index.models import Basicinfo

# Create your views here.


def index(request):
    return render(request,'index.html')

def party(request):
    return render(request,'party.html')

def diary(request):
    return render(request,'diary.html')

def login(request):
    return render(request,'login.html')

def reg(request):
    return render(request,'reg.html')

def case(request):
    return render(request,'case.html')

def safety(request):
    return render(request,'safety.html')

def reg_server_views(request):
  params = request.GET['params']
  # 将params转换成Python字典
  dic = json.loads(params)
  username=dic['username']
  if Accountinfo.objects.filter(username=username):

      return HttpResponse("用户名已存在!!")
  else:
      try:
        Accountinfo.objects.create(username=dic['username'],password=dic['password'],email=dic['email'])
        Basicinfo.objects.create(gender=dic['gender'],
                                 ageday=dic['ageday'],
                                 ageyear=dic['ageyear'],
                                 agemonth=dic['agemonth'],
                                 marrystat=dic['marrystat'],
                                 education=dic['education'],
                                 height=dic['height'],
                                 weight=dic['weight'],
                                 province=dic['province'],
                                 lovesort=dic['lovesort'],
                                 qq=dic['qq'],
                                 homepage=dic['homepage'],
                                 idnumber=dic['idnumber'])
        return HttpResponse("注册成功")

      except Exception as ex:
        print(ex)
        return HttpResponse("注册失败")

def login_check(request):
    if request.method == 'POST':
        username = request.POST.get('loginname')
        password = request.POST.get('password')
        user = Accountinfo.objects.filter(username= username)
        user = user[0]

        if user:
            if password == user.password:
                result = '1'
            else:
                result= '2'
        else:
            result = '2'

        return HttpResponse(result)

def usercenter(request):

    return render(request,'usercenter.html')

