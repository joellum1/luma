from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

import json

@api_view(['POST'])
@permission_classes([AllowAny])
def register_api(request):
    """
    Create a new user.
    """

    if request.method != "POST": return JsonResponse({"error": "POST required"}, status=400)

    data = json.loads(request.body)
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if User.objects.filter(username=username).exists(): return JsonResponse({"error": "Username already exists"}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)

    res = {
        "message": "User created successfully",
        "username": user.username
    }

    return JsonResponse(res, status=201)


@login_required
def current_user(request):
    return JsonResponse({"username": request.user.username})
