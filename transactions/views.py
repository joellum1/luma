from django.db.models import Sum

from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Transaction
from .serializers import TransactionSerializer

class TransactionListCreateAPI(generics.ListCreateAPIView):
    """
    GET: List all transactions for the logged-in user
    POST: Create a new transaction
    """

    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return transactions for the logged-in user
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically assign the logged-in user
        serializer.save(user=self.request.user)


class DashboardAPI(APIView):
    """
    GET: Returns summary for dashboard
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        transactions = Transaction.objects.filter(user=request.user)

        income_total = transactions.filter(transaction_type='INCOME').aggregate(Sum('amount'))['amount__sum'] or 0
        expense_total = transactions.filter(transaction_type='EXPENSE').aggregate(Sum('amount'))['amount__sum'] or 0
        balance = income_total - expense_total

        # Optional: totals per category
        category_totals = transactions.values('category').annotate(total=Sum('amount'))

        data = {
            'income_total': income_total,
            'expense_total': expense_total,
            'balance': balance,
            'category_totals': list(category_totals),
        }
        
        return Response(data)
