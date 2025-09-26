from django.db import models

# Create your models here.



class Advisor(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=150)
    bio = models.TextField(200)
    image = models.ImageField(upload_to='advisors/')
    
    # Many tags possible
    expertise = models.ManyToManyField("Expertise", blank=True)

    linkedin = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name


class Expertise(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Stat(models.Model):
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=50)   # e.g. "150+" or "98%"

    def __str__(self):
        return f"{self.label} - {self.value}"


class Testimonial(models.Model):
    text = models.TextField()
    author = models.CharField(max_length=100)
    role = models.CharField(max_length=100)

    def __str__(self):
        return self.author

