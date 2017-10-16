from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from django.views.decorators.cache import cache_page
from .models import courses
from .services import *
import re

# Create your views here.
#TTL = 15
#@cache_page(TTL)
def index(request):

	if request.method == 'POST':

		#add entry to course table
		if request.POST.get("action") == "add":
			course_name = request.POST.get("course_name").replace(" ", "")
			print ("here1")
			#not a valid course name (add escape later)
			if not re.match('^[A-Z]{3,4}[0-9]{3}$', course_name):
				return render(request, 'rip/index.html', {'courses_list': get_all_courses(),})
			#removing spaces
			course_fullname = request.POST.get("course_fullname", "")
			course_description = request.POST.get("course_description", "")
			course_score_init = request.POST.get("course_score_initial", "5.0")
			print ("here")
			create_or_update(course_name, course_fullname, course_description, course_score_init)

		#delete entry in course table
		elif request.POST.get("action") == "delete":
			course_name = request.POST.get("course_name").replace(" ", "")
			delete_course(course_name)

		#print(request.POST.get("action")+"ing "+course_name)
		update_cache()
		return redirect("/courses/")

	elif request.method == 'GET':
		print("in get")
		#search by subject
		if request.GET.get("action") == "search_by_subject":
			print("in action")
			subject = request.GET.get("subject")
			if subject == "":
				return render(request, 'rip/index.html', {'courses_list': get_all_courses(),})
			return render(request, 'rip/index.html', {'courses_list': get_courses_by_subject(subject),})
		else:
			return render(request, 'rip/index.html', {'courses_list': get_all_courses(),})
	#not post nor get
	else:
		return render(request, 'rip/index.html', {'courses_list': get_all_courses(),})

#@cache_page(TTL)
def detail(request, course_name):
	return render(request, 'rip/detail.html', {'course': get_course_detail_by_name(course_name),})