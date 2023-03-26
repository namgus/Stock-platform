from django.db import models

class Comment(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=False)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    comments = models.TextField()