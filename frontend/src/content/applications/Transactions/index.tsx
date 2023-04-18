import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import RecentOrders from './RecentOrders';
import Debates from './Debates';
import Comments from './Comments';
import AccountBalance from './AccountBalance'

function ApplicationsTransactions() {
  return (
    <>
      <Helmet>
        <title>Stock information</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          pt={5}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
          <Grid item xs={12}>
            <Debates />
          </Grid>
          <Grid item xs={12}>
            <Comments />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
