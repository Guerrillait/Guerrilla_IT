from django.contrib import admin
from .models import Advisor, Expertise, Stat, Testimonial
# Register your models here.


admin.site.register(Advisor)
admin.site.register(Expertise)
admin.site.register(Stat)

admin.site.register(Testimonial)