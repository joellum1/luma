from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register_api, name="register"),
    path("current/", views.current_user, name="current_user"),
]
