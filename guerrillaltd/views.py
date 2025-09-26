import requests
from django.shortcuts import render
from .models import Advisor, Stat, Testimonial


# Create your views here.
def index(request):
    return render(request, 'index.html')

def contact(request):
    return render(request, 'contact.html')

def adpanel(request):
    advisors = Advisor.objects.prefetch_related('expertise').all()
    stats = Stat.objects.all()
    testimonials = Testimonial.objects.all()
    return render(request, "adpanel.html", {
        "advisors": advisors,
        "stats": stats,
        "testimonials": testimonials,
    })


def blog(request):

    API_KEY = '10884418fa3c402190eb7821564f2b43'
    url = f"https://newsapi.org/v2/everything?q=tesla&from=2025-03-29&sortBy=publishedAt&apiKey={API_KEY}"

    response = requests.get(url)
    data = response.json()

    posts = data.get("items", [])  # List of blog posts

    return render(request, 'blog.html', {'posts': posts})




def resource(request):
    return render(request, 'resources.html')
def course(request):
    return render(request, 'course.html')


def webdev(request):
    return render(request, 'pages/webDev.html')
def software(request):
    return render(request, 'pages/software.html')
def mobileapp(request):
    return render(request, 'pages/mobileapp.html')
def d_marketing(request):
    return render(request, 'pages/digital_marketing.html')

def nletter(request):
    return render(request, 'pages/nletter.html')
def get_team(request):
    return render(request, 'pages/get_team.html')