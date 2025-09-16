from django.http import HttpResponseNotFound

def home(request):
    return HttpResponseNotFound("Frontend handles routing now.")
