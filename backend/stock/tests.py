from django.test import TestCase

from rest_framework.test import APIClient
from rest_framework import status

class HelloTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_api_get_hello(self):
        response = self.client.get('/stock/hello/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, "hello world!")

class PriceTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_price_api_with_default_code(self):
        response = self.client.get('/stock/price/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('price', response.data)

    def test_price_api_with_custom_code(self):
        code = "005930"
        response = self.client.get(f'/stock/price/?code={code}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(self.data['price'], 0)
        self.assertIn('price', response.data)

    def test_price_api_with_invalid_code(self):
        code = "000000"
        response = self.client.get(f'/stock/price/?code={code}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)