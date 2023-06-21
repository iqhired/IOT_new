from django.shortcuts import render

def add_device(request):

    return render(request,"device/add_device.html",{})
