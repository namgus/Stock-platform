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

    def test_price_with_default_code(self):
        response = self.client.get('/stock/price/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('price', response.data)

    def test_price_with_custom_code(self):
        code = "005930"
        response = self.client.get(f'/stock/price/?code={code}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(response.data['price'], 0)
        self.assertIn('price', response.data)

    def test_price_with_invalid_code(self):
        code = "000000"
        response = self.client.get(f'/stock/price/?code={code}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class DebateTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_debate_with_default(self):
        response = self.client.get('/stock/debate/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.content)

    def test_debate_with_custom_code_page(self):
        code = "005930"
        page = "2"
        response = self.client.get(f'/stock/debate/?code={code}&page={page}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.content)

    def test_debate_with_invalid_code(self):
        code = "000000"
        response = self.client.get(f'/stock/debate/?code={code}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_debate_with_invalid_page(self):
        page = "-1"
        response = self.client.get(f'/stock/debate/?page={page}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PredictPriceTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_predict_price_with_default_code(self):
        response = self.client.get('/stock/predict/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('predict_price', response.data)

    def test_predict_price_with_custom_code(self):
        code = "005930"
        response = self.client.get(f'/stock/predict/?code={code}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(response.data['predict_price'], 0)
        self.assertIn('predict_price', response.data)

    def test_predict_price_with_invalid_code(self):
        code = "000000"
        response = self.client.get(f'/stock/predict/?code={code}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        

class FinancialTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_financial_with_default_code(self):
        response = self.client.get('/stock/financial/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.content)

    def test_financial_with_custom_code(self):
        code = "005930"
        response = self.client.get(f'/stock/financial/?code={code}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.content)

    def test_financial_with_invalid_code(self):
        code = "000000"
        response = self.client.get(f'/stock/financial/?code={code}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
