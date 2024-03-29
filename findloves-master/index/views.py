import hashlib
import json
import time

import jwt
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from .models import Accountinfo
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
    if request.method=='POST':
        json_object = request.body
        # 将params转换成Python字典
        json_str = json.loads(json_object)

        username = json_str['username']

        if Accountinfo.objects.filter(username=username):

            result = {'code': 201, 'error': 'the username is used!'}
            return JsonResponse(result)


        else:
            p_m = hashlib.sha256()
            password = json_str['password']
            p_m.update(password.encode())
            try:
                Accountinfo.objects.create(username=username, password=p_m.hexdigest(),
                                       email=json_str['email'])

                id = Accountinfo.objects.get(username=username)

            # except Exception as e:
            #     result={'code':202,'error':'failed'}
            #     return JsonResponse(result)
                Basicinfo.objects.create(
                                    uid = id,
                                    gender=json_str['gender'],
                                     ageday=json_str['ageday'],
                                     ageyear=json_str['ageyear'],
                                     agemonth=json_str['agemonth'],
                                     marrystat=json_str['marrystat'],
                                     education=json_str['education'],
                                     height=json_str['height'],
                                     weight=json_str['weight'],
                                     province=json_str['province'],
                                     lovesort=json_str['lovesort'],
                                     qq=json_str['qq'],
                                     homepage=json_str['homepage'],
                                     idnumber=json_str['idnumber'])


            except Exception as ex:
                result={'code':202,'error':'the system is busy!'}
                return JsonResponse(result)
            token = make_token(username)
            result = {'code': 200, 'username': username, 'data': {'token': token.decode()}}
            return JsonResponse(result)




def login_check(request):
    if request.method == 'POST':
        username = request.POST.get('loginname')
        password = request.POST.get('password')
        user = Accountinfo.objects.filter(username= username)
        user = user[0]

        if not user:
            result ={'code':203,'error':'the username or password is wrong!'}
            return JsonResponse(result)

        p_m = hashlib.sha256()
        p_m.update(password.encode())
        p_m=p_m.hexdigest()

        if p_m!= user.password:
            result={'code':204,'error':'the username or password is wrong!'}
            return JsonResponse(result)
        token = make_token(username)
        result = {'code': 200, 'username': username, 'data': {'token': token.decode()}}
        return JsonResponse(result)

def usercenter(request,username=None):
    if request.method == 'GET':
        users1 = Accountinfo.objects.filter(username=username)
        user1 = users1[0]
        username = user1.username
        id = user1.id
        users = Basicinfo.objects.filter(uid=id)
        user = users[0]
        gender = user.gender
        ageday = user.ageday
        ageyear = user.ageyear
        agemonth = user.agemonth
        marrystat = user.marrystat
        education = user.education
        height = user.height
        weight = user.weight
        province = user.province
        lovesort = user.lovesort

        qq = user.qq
        homepage = user.homepage
        idnumber = user.idnumber
    return render(request,'usercenter.html',locals())

def make_token(username,expire=3600*24):
    """

    :param username:
    :param expire:
    :return:
    """
    key='123456'
    now=time.time()
    data={'username':username,'exp':int(now+expire)}
    return jwt.encode(data,key,algorithm='HS256')