import json

from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
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
  json_object= request.body
  # 将params转换成Python字典
  json_str= json.loads(json_object)
  username=json_str['username']
  return JsonResponse({'code':200})
  # if Accountinfo.objects.filter(username=username):
  #
  #     return HttpResponse("用户名已存在!!")
  # else:
  #     try:
  #       Accountinfo.objects.create(username=json_str['username'],password=json_str['password'],email=json_str['email'])
  #       Basicinfo.objects.create(gender=json_str['gender'],
  #                                ageday=json_str['ageday'],
  #                                ageyear=json_str['ageyear'],
  #                                agemonth=json_str['agemonth'],
  #                                marrystat=json_str['marrystat'],
  #                                education=json_str['education'],
  #                                height=json_str['height'],
  #                                weight=json_str['weight'],
  #                                province=json_str['province'],
  #                                lovesort=json_str['lovesort'],
  #                                qq=json_str['qq'],
  #                                homepage=json_str['homepage'],
  #                                idnumber=json_str['idnumber'])
  #       return HttpResponse("注册成功")
  #
  #     except Exception as ex:
  #       print(ex)
  #       return HttpResponse("注册失败")

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

