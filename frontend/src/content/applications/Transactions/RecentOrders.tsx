import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function RecentOrders() {
  const [cryptoOrders, setCryptoOrders] = useState<CryptoOrder[]>([]);

  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');

  useEffect(() => {
    axios.get('http://3.36.50.105:8000/stock/financial', {
      params: {
          code: {code}
      }
    })
      .then(response => {
        const financialData = response.data.data.reverse();

        const updatedCryptoOrders = financialData.map((data, index) => ({
          id: index,
          orderDate: new Date(data.날짜).getTime(),
          status: 'completed',
          bps: data.BPS,
          per: data.PER,
          pbr: data.PBR,
          eps: data.EPS,
          div: data.DIV,
          dps: data.DPS,
        }));

        // update the state with the modified cryptoOrders data
        setCryptoOrders(updatedCryptoOrders);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default RecentOrders;
