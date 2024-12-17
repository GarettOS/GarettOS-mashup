from django.test import TestCase, Client
from django.urls import reverse

class GameViewsTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_index_view(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

    def test_game_home_view(self):
        response = self.client.get('/games/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'games/game_home.html')
