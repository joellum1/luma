from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm
from .forms import UserRegisterForm
from .models import UserProfile

def register_view(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            # Create a user profile
            UserProfile.objects.create(user=user)
            login(request, user)
            return redirect('home')  # Change 'home' to your dashboard later
    else:
        form = UserRegisterForm()
    return render(request, 'users/register.html', {'form': form})

def login_view(request):
    next_url = request.GET.get('next', '')  # capture ?next=/page/

    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        next_url = request.POST.get('next', '')  # capture hidden next field

        if form.is_valid():
            user = form.get_user()
            login(request, user)

            if next_url: return redirect(next_url)

            return redirect('home')
    else:
        form = AuthenticationForm()

    return render(request, 'users/login.html', {'form': form, 'next': next_url})

def logout_view(request):
    logout(request)
    return redirect('login')
