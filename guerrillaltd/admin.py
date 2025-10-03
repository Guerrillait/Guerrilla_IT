from django.contrib import admin
from .models import Advisor, BlogPost, Expertise, Stat, Testimonial, Resource
# Register your models here.


admin.site.register(Advisor)
admin.site.register(Expertise)
admin.site.register(Stat)

admin.site.register(Testimonial)

admin.site.register(Resource)
class ResourceAdmin (admin.ModelAdmin):
    list_display = ('title', 'created_at')

admin.site.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'published_at')