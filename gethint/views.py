from django.http import JsonResponse
from rip.models import courses

def gethint(request, typed_letter):
	result = []
	candidates = list(courses.objects.filter(name__iregex = r'^%s' % typed_letter).order_by('name'))
	for x in range(0, len(candidates)):
		result.append(candidates[x].name)
	return JsonResponse(result, safe=False)