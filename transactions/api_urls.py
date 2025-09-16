from django.urls import path
from .views import TransactionListCreateAPI

urlpatterns = [
    path('transactions/', TransactionListCreateAPI.as_view(), name='api_transactions'),
]
