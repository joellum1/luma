from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    # Link this profile to the built-in User
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    monthly_income = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    savings_goal = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.user.username