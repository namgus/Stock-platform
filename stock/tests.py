from django.test import TestCase

from rest_framework.test import APIClient
from rest_framework import status

class ViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.response = self.client.get('/stock/hello/')

    def test_api_get_hello(self):
        self.assertEqual(self.response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.response.data, "hello world!")