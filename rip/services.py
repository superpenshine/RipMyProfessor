from .models import courses
from django.core.cache import cache
from django.shortcuts import get_object_or_404

def get_all_courses():
	if 'all_courses' in cache:
		return cache.get('all_courses')
	else:
		all_courses = list(courses.objects.order_by('name'))
		cache.set('all_courses', all_courses, 15)
		return all_courses

def get_course_detail_by_name(course_name):
	if course_name in cache:
		return cache.get(course_name)
	else:
		course = get_object_or_404(courses, name=course_name)
		cache.set(course_name, course, 15)
		return course