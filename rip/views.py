from django.shortcuts import render
from django.http import HttpResponse
from .models import courses
# Create your views here.
def index(request):
	courses_list = courses.objects.order_by('name')
	output = ', '.join([course.name for course in courses_list])
	return HttpResponse(output)

def detail(request, course_name):
	return HttpResponse("You're looking at question %s." %course_name)