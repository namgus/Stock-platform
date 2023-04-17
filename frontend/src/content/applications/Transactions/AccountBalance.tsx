import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingDown from '@mui/icons-material/TrendingDown';
import Text from 'src/components/Text';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';




const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${
    theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
  };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

function AccountBalance() {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: ['#ff9900', '#1c81c2', '#333', '#5c6ac0'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: ['Bitcoin', 'Ripple', 'Cardano', 'Ethereum'],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const chartSeries = [10, 20, 25, 45];

  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code') || '005930';

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
  const companyName = dictionary[String(code)]

  const [price, setPrice] = useState(0);

  useEffect(() => {
    axios.get('http://3.36.50.105:8000/stock/price', {
      params: {
          code
      }
    })
      .then(response => {
        setPrice(response.data.price);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const [predict, setPredict] = useState(0);

  useEffect(() => {
    axios.get('http://3.36.50.105:8000/stock/predict', {
      params: {
          code
      }
    })
      .then(response => {
        setPredict(Math.round(response.data.predict_price * 100) / 100);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const priceDifference = Math.round((predict - price) * 100) / 100
  const sign = priceDifference >= 0 ? "+" : "-";
  const signBool = sign =="+" ? true : false;
  const formattedPriceDifference = `${sign}${Math.abs(priceDifference).toLocaleString()}`;

  const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
        background-color: ${signBool ? theme.colors.error.main : theme.colors.primary.main};
        color: ${signBool ? theme.palette.error.contrastText : theme.palette.primary.contrastText};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${signBool ? theme.colors.shadows.error : theme.colors.shadows.primary};
  `
  );

  const TrendingIcon = styled(signBool ? TrendingUp : TrendingDown)(
    ({ theme }) => `
        color: ${signBool ? theme.palette.error.contrastText : theme.palette.primary.contrastText};
  `
  );

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h2"
            >
              {companyName}
            </Typography>
            <Box>
              <Typography variant="h2" gutterBottom>
                {price.toLocaleString()}원
              </Typography>
              <Box
                display="flex"
                sx={{
                  py: 4
                }}
                alignItems="center"
              >

              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid sm item>
                <Button fullWidth variant="outlined">
                  Buy
                </Button>
              </Grid>
              <Grid sm item>
                <Button fullWidth variant="contained">
                  Sell
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Box
            component="span"
            sx={{
              display: { xs: 'none', md: 'inline-block' }
            }}
          >
            <Divider absolute orientation="vertical" />
          </Box>

        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h3"
            >
              예상 주가
            </Typography>
            <Box>
              <Typography variant="h3" gutterBottom>
                {predict.toLocaleString()}원
              </Typography>
              <Box
                display="flex"
                sx={{
                  py: 4
                }}
                alignItems="center"
              >
                <AvatarSuccess
                  sx={{
                    mr: 2
                  }}
                  variant="rounded"
                >
                  <TrendingIcon fontSize="large" />
                </AvatarSuccess>
                <Box>
                  <Typography variant="h4">{formattedPriceDifference}</Typography>
                </Box>
              </Box>
            </Box>

          </Box>
        </Grid>


        </Grid>
        
      </Grid>
    </Card>
  );
}

export default AccountBalance;
