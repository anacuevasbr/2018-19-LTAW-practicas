from __future__ import unicode_literals
from django.db import models

class Product (models.Model):
    name = models.CharField(max_length=200)
    image = models.CharField(max_length=1000)
    description = models.CharField(max_length=1000)
    price = models.CharField(max_length=400)
