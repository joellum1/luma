from django.urls import path
from . import views

urlpatterns = [
    path('', views.TransactionListCreateAPI.as_view(), name='transactions-list-create'),
    path('<int:pk>/', views.TransactionRetrieveUpdateDestroyAPI.as_view(), name='transactions-rud'),
]
