import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import productApi from '../../../../api/productpi';
import { Container, Grid, Paper } from '@mui/material';

ProductDetail.propTypes = {};

function ProductDetail(props) {
  const { id } = useParams();
  console.log('kkkkk', id);
  useEffect(() => {
    async function fecthApi() {
      let res = await productApi.get(id);
      console.log('hhhh', res);
    }
    fecthApi();
  });
  return (
    <Container fixed>
      <Grid container spacing={0.3}>
        <Grid item xs={4}>
          <Paper sx={{ padding: '16px' }}>
            <h1>fffffffffffffff</h1>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ padding: '8px', minHeight: '380px' }}>
            <h1>fffffffffffffff</h1>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;
