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
			course_name = request.POST.get("course_name")

			#not a valid course name (add escape later)
			if not re.match('^[A-Z]{3,4}[0-9]{3}$', course_name):
				return render(request, 'rip/index.html', {'courses_list': get_all_courses(),})

			course_fullname = request.POST.get("course_fullname", "")
			course_description = request.POST.get("course_description", "")

			#avoid non-number inputs
			try:
				course_score_init = float(request.POST.get("course_score_initial", "5.0"))
			except Exception:
				course_score_init = 5
			if courses.objects.filter(name=course_name).count() != 0:
				courses.objects.filter(name=course_name).update(fullname=course_fullname, description=course_description, score=course_score_init)
			else:
				courses.objects.create(name=course_name, fullname=course_fullname, description=course_description, score=course_score_init)

		#delete entry in course table
		elif request.POST.get("action") == "delete":

			course_name = request.POST.get("course_name")
			courses.objects.filter(name=course_name).delete()

		print(request.POST.get("action")+"ing "+course_name)
		update_cache()
		return redirect("http://127.0.0.1:8000/courses/")

	else:
		return render(request, 'rip/index.html', {'courses_list': get_all_courses(),})

#@cache_page(TTL)
def detail(request, course_name):
	return render(request, 'rip/detail.html', {'course': get_course_detail_by_name(course_name),})