from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('contact', views.contact, name='contact'),
    path('adpanel', views.adpanel, name='adpanel'),
    path('blog', views.blog, name='blog'),
    path('resource', views.resource, name='resource'),
    path('course', views.course, name='course'),
    path('webdev/', views.webdev, name='webdev'),
    path('software/', views.software, name= 'software'),
    path('mobileapp/', views.mobileapp, name='mobileapp'),
    path('d_marketing/', views.d_marketing, name='d_marketing'),
    path('nletter/', views.nletter, name='nletter'),
    path('get_team/', views.get_team, name='get_team'),
    
    
]
