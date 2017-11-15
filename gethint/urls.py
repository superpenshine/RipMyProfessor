from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^(?P<typed_letter>[a-zA-Z]+[0-9]{0,3})$', views.gethint, name='hint'),
]