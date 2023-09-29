import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import productApi from '../../../../api/productpi';
import { Button, Container, Grid, Paper } from '@mui/material';
import iPhone13 from '../../../../assets/iphone13.jpg';
import { STATIC_HOT, THUMBNAIL_PACEHOODER } from '../../../../constants/common';
import { formatPrice } from '../../../../constants/common';
import DOMPurify from 'dompurify';

ProductDetail.propTypes = {};

function ProductDetail(props) {
  const { id } = useParams();
  const [productData, setProductData] = useState();
  const safeDescription = DOMPurify.sanitize(productData?.description);
  const mark = { __html: safeDescription };

  useEffect(() => {
    async function fecthApi() {
      let res = await productApi.get(id);
      setProductData(res.data);
    }
    fecthApi();
  }, [id]);
  console.log('hhhh', productData);
  const imageUrl =
    productData?.thumbnail && productData.thumbnail?.url
      ? `${STATIC_HOT}${productData.thumbnail?.url}`
      : THUMBNAIL_PACEHOODER;
  return (
    <>
      <Container fixed>
        <Grid container spacing={0.3} sx={{ paddingTop: '80px' }}>
          <>
            <Grid item xs={4}>
              <Paper sx={{ padding: '16px' }}>
                <img src={imageUrl} alt="" style={{ width: '350px', height: '360px' }} />
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper sx={{ padding: '8px', minHeight: '380px' }}>
                <h1>{productData?.name}</h1>
                <span> &nbsp; {productData?.shortDescription}</span>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <p style={{ textDecoration: 'line-through' }}>{formatPrice(productData?.originalPrice)}</p>
                  <p>-{productData?.promotionPercent}%</p>
                  <p>{formatPrice(productData?.salePrice)} </p>
                </div>
                <div>
                  <Button variant="contained">Add To Cart</Button>
                </div>
              </Paper>
            </Grid>
          </>
        </Grid>
      </Container>
      <Container fixed>
        <Grid container spacing={0.3}>
          <Grid item xs={12}>
            <h2 style={{ color: 'black' }}> &nbsp; &nbsp; Description</h2>
            <Paper sx={{ padding: '16px' }}>
              <div dangerouslySetInnerHTML={mark}></div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProductDetail;
