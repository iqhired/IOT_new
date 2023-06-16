from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUser
from .models import User
from django.utils.translation import gettext as _

from quickstart import models

class UserAdmin(BaseUser):
    ordering = ['id']
    list_display = ['id','username','email','name']
    list_display = ['id','email']
    fieldsets = (
        (None,{'fields':('username','email','passoword')}),
        (_('Personal Info'),{'fields':('name',)}),
        (_('Permission'),{'fields':('is_active','is_staff','is_superuser')}),
        (_('Imp dates'),{'fields':('last_login',)})
    )
    add_fieldsets = (
        (None,{
            'classes':('wide',),
            'fields':('email','username','password1','password2')
        })
    )
    admin.site.register(models.User)
