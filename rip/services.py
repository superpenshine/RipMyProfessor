import re
from .models import courses
from django.core.cache import cache
from django.shortcuts import get_object_or_404

def get_all_courses():

	if 'all_courses' in cache:
		return cache.get('all_courses')
	else:
		all_courses = list(courses.objects.order_by('name'))
		cache.set('all_courses', all_courses, 0)
		return all_courses

def update_cache():

	all_courses = list(courses.objects.order_by('name'))
	cache.set('all_courses', all_courses, 0)

def get_course_detail_by_name(course_name):

	if course_name in cache:
		return cache.get(course_name)
	else:
		course = get_object_or_404(courses, name=course_name)
		cache.set(course_name, course, 0)
		return course

def get_courses_by_subject(subject):
	#consider not using cache
	if subject in cache:
		return cache.get(subject)
	else:
		regex = re.compile(r'^%s[0-9]{3}$' % subject, re.I)
		courses_in_subject = courses.objects.filter(name__iregex = r'^%s[0-9]{3}$' % subject).order_by('name')
		cache.set(subject, courses_in_subject, 0)
		return courses_in_subject