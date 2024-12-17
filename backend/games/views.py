from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
# request --> response
# request handler
def game_home(request):
    return render(request, 'games/game_home.html')

def tic_tac_toe(request):
    return render(request, 'games/tic-tac-toe.html', status=200)

def index(request):
    return render(request, 'index.html', status=200)

def handler404(request, exception):
    return render(request, 'games/404.html', status=404)