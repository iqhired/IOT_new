from django.contrib import admin
from django.urls import include, path
from .views import *

urlpatterns = [
    path("",profile),
    path("profile",profile),
    path("add_device/",device_add),
    
]