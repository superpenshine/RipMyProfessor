from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.views.decorators.cache import cache_page
from .models import courses
from .services import get_all_courses, get_course_detail_by_name
# Create your views here.
@cache_page(15)
def index(request):
	if request.method == 'POST':
		courses.objects.create(name=request.POST['course_name'], fullname=request.POST['course_fullname'], description=request.POST['course_description'], score=float(request.POST['course_score_initial']))
	return render(request, 'rip/index.html', {'courses_list': get_all_courses(),})

@cache_page(15)
def detail(request, course_name):
	return render(request, 'rip/detail.html', {'course': get_course_detail_by_name(course_name),})