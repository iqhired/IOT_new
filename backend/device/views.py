from django.shortcuts import redirect, render
from .models import Device, models

def profile(request):

    std = Device.objects.all()

    return render(request,"device/profile.html",{'std':std})

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

def delete_device(request,device_id):
    s = Device.objects.get(pk=device_id)
    s.delete()

    return redirect("/device/profile")

def update_device(request ,device_id):
     std = Device.objects.get(pk=device_id)
     return render(request,"Device/update_device.html",{'std': std})

def do_update_device(request,device_id):
    device_name = request.POST.get('d_name')
    device_id = request.POST.get('d_id')
    location = request.POST.get('d_location')

    std = Device.objects.get(pk=device_id)
    std.device_name = device_name
    std.device_id = device_id
    std.location = location
   
    std.save()

    return redirect("/device/profile")


