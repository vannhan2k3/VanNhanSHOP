import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import productApi from '../../../../api/productpi';
import { Button, Container, Grid, Paper } from '@mui/material';
import daucong from '../../../../assets/daucong.png';
import dautru from '../../../../assets/dautru.png';
import { STATIC_HOT, THUMBNAIL_PACEHOODER } from '../../../../constants/common';
import { formatPrice } from '../../../../constants/common';
import DOMPurify from 'dompurify';
import aosominu from '../../../../assets/aosominu.jpg';
import khautrang from '../../../../assets/khautrang.jpg';
import skincare from '../../../../assets/skincare.jpg';
import ocung from '../../../../assets/ocung.jpg';
import laptop from '../../../../assets/laptop.jpg';
import iphone from '../../../../assets/iphone12.jpg';
import './style.scss';
import { useDispatch } from 'react-redux';
import { addTocart, showMiniCart } from '../../../Cart/cartSlice';

ProductDetail.propTypes = {};

function ProductDetail(props) {
  const { id } = useParams();
  const [productData, setProductData] = useState();
  const [quantity, setQuantity] = useState(1); // Khởi tạo số lượng là 1
  const [cart, setCart] = useState([]);
  const safeDescription = DOMPurify.sanitize(productData?.description);
  const mark = { __html: safeDescription };
  const imageUrl = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fecthApi() {
      let res = await productApi.get(id);
      setProductData(res.data);
    }
    fecthApi();
  }, [id]);

  // Hàm để tăng số lượng
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Hàm để giảm số lượng, nhưng không thể nhỏ hơn 1
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddToCart = () => {
    const action = addTocart({
      id: productData.id,
      product: productData,
      quantity: quantity,
    });
    dispatch(action);
    dispatch(showMiniCart());
  };

  if (productData?.thumbnail && productData.thumbnail?.url) {
    imageUrl.current = `${STATIC_HOT}${productData.thumbnail?.url}`;
  } else {
    switch (productData?.category.id) {
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
    <>
      <Container fixed>
        <Grid container spacing={0.3} sx={{ paddingTop: '80px' }}>
          <>
            <Grid item xs={4}>
              <Paper sx={{ padding: '16px' }}>
                <img src={imageUrl.current} alt="" style={{ width: '350px', height: '380px' }} />
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

                <p>Số Lượng:</p>
                <div className="quantity">
                  <img className="add" src={dautru} alt="" onClick={decreaseQuantity} />
                  <p>{quantity}</p>
                  <img className="add" src={daucong} alt="" onClick={increaseQuantity} />
                </div>
                <div>
                  <Button variant="contained" onClick={handleAddToCart}>
                    Add To Cart
                  </Button>
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
