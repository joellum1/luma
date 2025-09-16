from django.urls import path
from . import views

urlpatterns = [
    path('', views.transaction_list, name='transaction_list'),
    path('new/', views.transaction_create, name='transaction_create'),
]
