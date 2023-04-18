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
import Text from 'src/components/Text';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

import { useEffect, useState } from 'react';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

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

interface CompanyData {
  id: number;
  name: string;
  sentiment: number;
  bps: number;
  per: number;
  pbr: number;
  eps: number;
  div: number;
  dps: number;
}

function AccountBalance({ cryptoOrders }) {
  const theme = useTheme();

  const [selectedData, setSelectedData] = useState<'sentiment' | 'bps' | 'per' | 'pbr' | 'eps' | 'div' | 'dps'>('per');

  // Define a sorting function based on the selected data
  const sortFunction = (a: CompanyData, b: CompanyData) => {
    const ascending = ['sentiment', 'bps', 'eps', 'div', 'dps'].includes(selectedData);
    const aValue = ascending ? a[selectedData] : -a[selectedData];
    const bValue = ascending ? b[selectedData] : -b[selectedData];
    return bValue - aValue;
  };
  
  // Get the top 4 companies based on the selected data
  const top4Companies = () => {
    const sortedOrders = [...cryptoOrders].sort(sortFunction);
    return sortedOrders.slice(0, 4);
  };

  // Define a function to update the secondary text of the ListItemText
  const getSecondaryText = (company: CompanyData) => {
    switch (selectedData) {
      case 'sentiment':
        return `${company.sentiment}% sentiment`;
      case 'bps':
        return `${company.bps.toFixed(2)} BPS`;
      case 'per':
        return `${company.per.toFixed(2)} P/E Ratio`;
      case 'pbr':
        return `${company.pbr.toFixed(2)} P/B Ratio`;
      case 'eps':
        return `${company.eps.toFixed(2)} EPS`;
      case 'div':
        return `${company.div.toFixed(2)} DIV Yield`;
      case 'dps':
        return `${company.dps.toFixed(2)} DPS`;
      default:
        return '';
    }
  };

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
    colors: ['#EC6B56', '#FFC154', '#47B39C', '#6050DC'],
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
    labels: top4Companies().map((company) => company.name),
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

  const chartSeriesSame = [25, 25, 25, 25];
  const chartSeriesWeight = [40, 30, 20, 10];

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={12}>
          <Box sx={{ margin: 3 }}>
            <Typography variant="h3" gutterBottom align='center'>
              추천 포트폴리오
            </Typography>
          </Box>
          <Box
            component="span"
            sx={{
              display: { md: 'inline-block' },
              width: '100%',
              textAlign: 'center'
            }}
          >
            <Button onClick={() => setSelectedData('sentiment')} sx={{ margin: 1 }} variant="outlined">감성분석</Button>
            <Button onClick={() => setSelectedData('bps')} sx={{ margin: 1 }} variant="outlined">BPS</Button>
            <Button onClick={() => setSelectedData('per')} sx={{ margin: 1 }} variant="outlined">PER</Button>
            <Button onClick={() => setSelectedData('pbr')} sx={{ margin: 1 }} variant="outlined">PBR</Button>
            <Button onClick={() => setSelectedData('eps')} sx={{ margin: 1 }} variant="outlined">EPS</Button>
            <Button onClick={() => setSelectedData('div')} sx={{ margin: 1 }} variant="outlined">DIV</Button>
            <Button onClick={() => setSelectedData('dps')} sx={{ margin: 1 }} variant="outlined">DPS</Button>
            <Divider />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 2
              }}
              variant="h4"
            >
              동일 비중 포트폴리오
            </Typography>
            <Typography
              variant="body1"
            >
              Equally Weighted Portfolio
            </Typography>
          </Box>
          
          <Box pt={1} pb={6} pr={4} flex={1}>
            <Grid container spacing={0}>
              <Grid
                xs={12}
                sm={5}
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Chart
                  height={250}
                  options={chartOptions}
                  series={chartSeriesSame}
                  type="donut"
                />
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
                {/* ... chart code here */}
                <List
                  disablePadding
                  sx={{
                    width: '100%'
                  }}
                >
                  {/* Map through the top 4 companies and create a new ListItem with the updated ListItemText */}
                  {top4Companies().map((company, index) => (
                    <ListItem key={company.id}>
                      <ListItemAvatarWrapper>
                        <img
                          src={`/static/images/logo/${getImageName(company.name)}.svg`}
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary={`${company.name}`}
                        secondary={ getSecondaryText(company) }
                        primaryTypographyProps={{ variant: 'h4', noWrap: true }}
                        secondaryTypographyProps={{
                          variant: 'subtitle2',
                          noWrap: true
                        }}
                      />
                      <Box>
                      <Typography align="right" variant="h4" noWrap>
                        {chartSeriesSame[index]}%
                      </Typography>
                      {company.sentiment > 0 ? (
                      <Text color="success">+{company.sentiment}%</Text>
                      ) : (
                      <Text color="error">{company.sentiment}%</Text>
                      )}
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 2
              }}
              variant="h4"
            >
              가치 가중 포트폴리오
            </Typography>
            <Typography
              variant="body1"
            >
              Value Weighted Portfolio
            </Typography>
          </Box>
          
          <Box pt={1} pb={6} pr={4} flex={1}>
            <Grid container spacing={0}>
              <Grid
                xs={12}
                sm={5}
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Chart
                  height={250}
                  options={chartOptions}
                  series={chartSeriesWeight}
                  type="donut"
                />
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
                {/* ... chart code here */}
                <List
                  disablePadding
                  sx={{
                    width: '100%'
                  }}
                >
                  {/* Map through the top 4 companies and create a new ListItem with the updated ListItemText */}
                  {top4Companies().map((company, index) => (
                    <ListItem key={company.id}>
                      <ListItemAvatarWrapper>
                        <img
                          src={`/static/images/logo/${getImageName(company.name)}.svg`}
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary={`${company.name}`}
                        secondary={ getSecondaryText(company) }
                        primaryTypographyProps={{ variant: 'h4', noWrap: true }}
                        secondaryTypographyProps={{
                          variant: 'subtitle2',
                          noWrap: true
                        }}
                      />
                      <Box>
                      <Typography align="right" variant="h4" noWrap>
                        {chartSeriesWeight[index]}%
                      </Typography>
                      {company.sentiment > 0 ? (
                      <Text color="success">+{company.sentiment}%</Text>
                      ) : (
                      <Text color="error">{company.sentiment}%</Text>
                      )}
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>

      </Grid>
    </Card>
  );
}

export default AccountBalance;
