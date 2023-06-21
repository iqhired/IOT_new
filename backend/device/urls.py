from django.contrib import admin
from django.urls import include, path
from .views import *

urlpatterns = [
    path("",add_device),
    path("device/",add_device),
    
]