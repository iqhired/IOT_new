from django.contrib import admin
from django.urls import include, path
from .views import *

urlpatterns = [
    path("",profile),
    path("profile",profile),
    path("add_device/",device_add),
    path("delete_device/<int:device_id>",delete_device),
    path("update_device/<int:device_id>",update_device),
    path("do_update_device/<int:device_id>",do_update_device),

    
]