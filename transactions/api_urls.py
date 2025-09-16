from django.urls import path
from .views import TransactionListCreateAPI, DashboardAPI

urlpatterns = [
    path('transactions/', TransactionListCreateAPI.as_view(), name='api_transactions'),
    path('dashboard/', DashboardAPI.as_view(), name='api_dashboard'),

]
