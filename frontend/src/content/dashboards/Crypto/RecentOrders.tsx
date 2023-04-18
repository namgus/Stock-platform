import { Card, Grid, Container } from '@mui/material';
import { CryptoOrder } from 'src/models/financial_all';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AccountBalance from './AccountBalance';

const dictionary = {
  '005930': '삼성전자',
  '373220': 'LG에너지솔루션',
  '000660': 'SK하이닉스',
  '207940': '삼성바이오로직스',
  '051910': 'LG화학',
  '006400': '삼성SDI',
  '005380': '현대차',
  '005490': 'POSCO홀딩스',
  '000270': '기아',
  '035420': '네이버'
};

function RecentOrders() {
  const [cryptoOrders, setCryptoOrders] = useState<CryptoOrder[]>([]);
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');

  useEffect(() => {
    const getSentiment = (presentPrice: number, predictedPrice: number) => {
      const percentageDifference = ((predictedPrice - presentPrice) / presentPrice) * 100;
      return percentageDifference.toFixed(2);
    };

    const apiCalls = Object.keys(dictionary).map((key) => {
      const companyCode = key;
      return axios.all([
        axios.get(`http://3.36.50.105:8000/stock/financial?code=${companyCode}`),
        axios.get(`http://3.36.50.105:8000/stock/price?code=${companyCode}`),
        axios.get(`http://3.36.50.105:8000/stock/predict?code=${companyCode}`)
      ]);
    });

    axios.all(apiCalls.flat())
      .then((responses) => {
        
        const updatedCryptoOrders: CryptoOrder[] = [];
        responses.forEach((response, index) => {
          const [financialResponse, priceResponse, predictResponse] = response;
          
          const financialData = financialResponse.data.data.reverse();
          const presentPrice = priceResponse.data.price;
          const predictedPrice = predictResponse.data.predict_price;
          const companyCode = Object.keys(dictionary)[index];
          const companyName = dictionary[companyCode]; // get company name from dictionary

          const companyData = financialData[0];
          
          const sentiment = getSentiment(presentPrice, predictedPrice);
          console.log(presentPrice, predictedPrice)
          
          updatedCryptoOrders.push({
            id: companyCode,
            name: companyName,
            orderDate: new Date(companyData.날짜).getTime(),
            status: 'completed',
            bps: companyData.BPS,
            per: companyData.PER,
            pbr: companyData.PBR,
            eps: companyData.EPS,
            div: companyData.DIV,
            dps: companyData.DPS,
            sentiment: sentiment
          });
        });

        // update the state with the modified cryptoOrders data
        setCryptoOrders(updatedCryptoOrders);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={4}
    >
      <Grid item xs={12}>
        <RecentOrdersTable cryptoOrders={cryptoOrders} />
      </Grid>
      <Grid item xs={12}>
        <AccountBalance cryptoOrders={cryptoOrders} />
      </Grid>
    </Grid>
  );
}

export default RecentOrders;
