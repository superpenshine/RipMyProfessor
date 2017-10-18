from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^(?P<subject>[a-zA-z]+)$', views.courses, name='courses'),
	url(r'^(?P<course_name>[A-Z]{3,4}[0-9]{3})', views.detail, name='detail'),
]