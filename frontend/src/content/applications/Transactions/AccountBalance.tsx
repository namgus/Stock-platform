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
  margin-right: ${theme.spacing(2)};
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

  const getImageName = (companyName: string): string => {
    switch (companyName) {
      case '삼성바이오로직스':
      case '삼성전자':
      case '삼성SDI':
        return 'samsung';
      case 'LG에너지솔루션':
      case 'LG화학':
        return 'lg';
      case 'SK하이닉스':
        return 'sk';
      case '현대차':
        return 'hyundai';
      case 'POSCO홀딩스':
        return 'posco';
      case '기아':
        return 'kia';
      case '네이버':
        return 'naver';
      default:
        return '';
    }
  };

  const [price, setPrice] = useState(0);

  useEffect(() => {
    axios.get('http://43.201.185.173:8000/stock/price', {
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
    axios.get('http://43.201.185.173:8000/stock/predict', {
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
            <ListItem>
              <ListItemAvatarWrapper>
                <img
                  src={`/static/images/logo/${getImageName(companyName)}.svg`}
                />
              </ListItemAvatarWrapper>
              <ListItemText
                primary={companyName}
                primaryTypographyProps={{ variant: 'h2', noWrap: true }}
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={`${price.toLocaleString()}원`}
                primaryTypographyProps={{ variant: 'h3', noWrap: true }}
                sx={{ pb: 4, pt: 1, pl: 10 }}
              />
            </ListItem>
            
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
                pt: 3,
                pb: 2
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
