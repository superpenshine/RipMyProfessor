#provide service to views
from django.shortcuts import get_object_or_404
from django.core.cache import cache
from .models import courses

def get_all_courses():

	if 'all_courses' in cache:
		return cache.get('all_courses')

	all_courses = list(courses.objects.order_by('name'))
	cache.set('all_courses', all_courses, 0)
	return all_courses

#create an entry in database or update an entry
def create_or_update(course_name, course_fullname, course_description, course_score_init):
	if courses.objects.filter(name=course_name).count() != 0:
		courses.objects.filter(name=course_name).update(fullname=course_fullname, description=course_description, score=course_score_init)
	else:
		courses.objects.create(name=course_name, fullname=course_fullname, description=course_description, score=course_score_init)

#delete a course():
def delete_course(course_name):
	courses.objects.filter(name=course_name).delete()

#update cache in redis server upon data changes
def update_cache():

	all_courses = list(courses.objects.order_by('name'))
	cache.set('all_courses', all_courses, 0)

def get_course_detail_by_name(course_name):

	if course_name in cache: return cache.get(course_name)

	course = get_object_or_404(courses, name=course_name)
	cache.set(course_name, course, 0)
	return course

def get_courses_by_subject(subject):
	#consider not using cache
	if subject in cache: return cache.get(subject)

	#regex = re.compile(r'^%s[0-9]{3}$' % subject, re.I)
	courses_in_subject = courses.objects.filter(name__iregex=r'^%s[A-Z]{0,4}[0-9]{0,3}$'%subject).order_by('name')
	cache.set(subject, courses_in_subject, 0)
	return courses_in_subject
