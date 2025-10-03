import requests
from django.shortcuts import render
from django.utils.dateparse import parse_datetime
from .models import Advisor, BlogPost, Stat, Testimonial, Resource


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
    # Local posts থেকে data
    local_posts = []
    for post in BlogPost.objects.all():
        local_posts.append({
            "title": post.title,
            "description": post.content,
            "urlToImage": post.image.url if post.image else None,
            "publishedAt": post.published_at,
            "category": post.category,
            "source": "local"
        })

    # API থেকে data
    API_KEY = "your_api_key_here"
    url = f"https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey={API_KEY}"

    try:
        response = requests.get(url, timeout=5)
        data = response.json()
        api_articles = data.get("articles", [])
    except Exception as e:
        print("API error:", e)
        api_articles = []

    api_posts = []
    for article in api_articles:
        published = article.get("publishedAt")
        published_date = parse_datetime(published) if published else None
        api_posts.append({
            "title": article.get("title"),
            "description": article.get("description"),
            "urlToImage": article.get("urlToImage"),
            "publishedAt": published_date,
            "category": "NewsAPI",
            "source": "api",
            "url": article.get("url")
        })

    # Merge + Sort (latest first)
    all_posts = local_posts + api_posts
    all_posts = sorted(all_posts, key=lambda x: x["publishedAt"] or "", reverse=True)

    return render(request, "blog.html", {"posts": all_posts})




def resource(request):
    resources = Resource.objects.all().order_by('-created_at')
    return render(request, 'resources.html', {'resources' : resources})
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