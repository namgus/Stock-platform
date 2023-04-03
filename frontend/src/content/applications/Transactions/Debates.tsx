import { Card } from '@mui/material';
import { NaverDebate } from 'src/models/naver_debate';
import DebatesTable from './DebatesTable';
import { subDays } from 'date-fns';

import { useEffect, useState } from 'react';
import axios from 'axios';

function Debates() {
  const [naverDebates, setNaverDebates] = useState<NaverDebate[]>([]);

  useEffect(() => {
    axios.get('http://3.36.50.105:8000/stock/debate')
      .then(response => {
        const financialData = response.data;

        const updatedNaverDebates = financialData.map((data, index) => ({
          id: index,
          status: 'positive',
          date: new Date(data.날짜).getTime(),
          title: data.제목,
          views: data.조회,
          good: data.공감,
          bad: data.비공감,
          sentiment: data.감성분석,
        }));

        // update the state with the modified naverDebates data
        setNaverDebates(updatedNaverDebates);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Card>
      <DebatesTable naverDebates={naverDebates} />
    </Card>
  );
}

export default Debates;
