import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { itemCartTotalSelector } from '../Cart/selector';
import { Container, Grid, Paper } from '@mui/material';
import productApi from '../../api/productpi';
import { useParams } from 'react-router-dom';
import { STATIC_HOT, THUMBNAIL_PACEHOODER } from '../../constants/common';
import aosominu from '../../assets/aosominu.jpg';
import khautrang from '../../assets/khautrang.jpg';
import skincare from '../../assets/skincare.jpg';
import ocung from '../../assets/ocung.jpg';
import laptop from '../../assets/laptop.jpg';
import iphone from '../../assets/iphone12.jpg';
import DOMPurify from 'dompurify';

DetailCart.propTypes = {};

function DetailCart(props) {
  const { id } = useParams();
  const itemCart = useSelector((state) => state.cart.itemCart);

  const [detailData, setDetailData] = useState();
  const imageUrl = useRef();

  //tinh tong tiền
  const totalMoney = useSelector(itemCartTotalSelector);

  useEffect(() => {
    async function fecthApi() {
      let res = await productApi.get(id);
      setDetailData(res.data);
    }

    fecthApi();
  }, [id]);

  if (detailData?.thumbnail && detailData.thumbnail?.url) {
    imageUrl.current = `${STATIC_HOT}${detailData.thumbnail?.url}`;
  } else {
    switch (detailData?.category.id) {
      case 1:
        imageUrl.current = aosominu;
        break;
      case 2:
        imageUrl.current = khautrang;
        break;
      case 3:
        imageUrl.current = skincare;
        break;
      case 4:
        imageUrl.current = laptop;
        break;
      case 5:
        imageUrl.current = ocung;
        break;
      case 6:
        imageUrl.current = iphone;
        break;
      default:
        imageUrl.current = THUMBNAIL_PACEHOODER;
        break;
    }
  }
  return (
    <div style={{ paddingTop: '80px' }}>
      <h3>Sản Phẩm Trong Giỏ Hàng </h3>
      <>
        <Container fixed>
          <Grid container spacing={0.3} sx={{ paddingTop: '80px' }}>
            <>
              <Grid item xs={4}>
                <Paper sx={{ padding: '16px' }}>
                  <img src={iphone} alt="detailData?.name" style={{ width: '100%', height: '100%' }} />
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <Paper sx={{ padding: '8px', minHeight: '370px' }}>
                  <span>Dien Thoai Iphone</span>
                  <span>90000000vnd</span>
                </Paper>
              </Grid>
            </>
          </Grid>
        </Container>
      </>
    </div>
  );
}

export default DetailCart;
