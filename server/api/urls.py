from django.urls import path
from . import views

from api import views

urlpatterns = [
    path("", views.index),
    path("chat", views.chat),
    path('sign-lan/analysis', views.sign_lan_analysis),
]
