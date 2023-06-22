from django.shortcuts import redirect, render
from .models import Device, models

def profile(request):

    return render(request,"device/profile.html",{})

def device_add(request):

    if request.method =='POST':
        print("Added")
        device_name = request.POST.get("d_name")
        device_id = request.POST.get("d_id")
        device_location = request.POST.get("d_location")

        # Create an object for models

        s = Device()
        s.device_name = device_name
        s.device_id = device_id
        s.location = device_location

        s.save()
        return redirect("/device/profile")



    return render(request, "device/add_device.html",{})
