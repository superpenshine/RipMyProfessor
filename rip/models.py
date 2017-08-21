from django.db import models

# Create your models here.
class courses(models.Model):
	name = models.CharField(max_length=8, blank=False)
	fullname = models.TextField(max_length=30)
	description = models.TextField(max_length=500,)
	score = models.FloatField(null=True, blank=True, default=5.0)
	
	def __str__(self):
		return self.name

	def has_high_score(self, threshold):
		return self.score >= threshold