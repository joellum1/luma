from django.urls import path
from .views import TransactionListCreateAPI, DashboardAPI

urlpatterns = [
    path('dashboard/', DashboardAPI.as_view(), name='dashboard'),
    path('transactions/', TransactionListCreateAPI.as_view(), name='transactions'),
]
