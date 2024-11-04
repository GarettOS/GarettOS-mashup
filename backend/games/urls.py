from django.urls import path
from . import views

urlpatterns = [
    path('tic-tac-toe/', views.tic_tac_toe),
    path('', views.game_home)
]
