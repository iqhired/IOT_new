from django.db import models

class Device(models.Model):
    device_name = models.CharField(max_length=100)
    device_id = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
