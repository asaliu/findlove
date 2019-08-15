
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^index/$',views.index),
    url(r'^$',views.index),
    url(r'^party/$',views.party),
    url(r'^diary/$',views.diary),
    url(r'^login/$',views.login),
    #通过json完成注册
    url(r'^reg/$',views.reg),
    url(r'^reg-server/$',views.reg_server_views),
    url(r'^case/$',views.case),
    url(r'^safety/$',views.safety),
    url(r'^login/check/$',views.login_check),
    url(r'^usercenter/(?P<username>[\w]+)$',views.usercenter),
]