from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
# request --> response
# request handler
def game_home(request):
    return render(request, 'games/game_home.html')

def tic_tac_toe(request):
    return render(request, 'games/tic-tac-toe.html')

def index(request):
    return render(request, 'index.html')