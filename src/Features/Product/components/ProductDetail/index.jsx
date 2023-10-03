import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import productApi from '../../../../api/productpi';
import { Button, Container, Grid, Paper } from '@mui/material';
import daucong from '../../../../assets/daucong.png';
import dautru from '../../../../assets/dautru.png';
import { STATIC_HOT, THUMBNAIL_PACEHOODER } from '../../../../constants/common';
import { formatPrice } from '../../../../constants/common';
import DOMPurify from 'dompurify';
import './style.scss';

ProductDetail.propTypes = {};

function ProductDetail(props) {
  const { id } = useParams();
  const [productData, setProductData] = useState();
  const [quantity, setQuantity] = useState(1); // Khởi tạo số lượng là 1
  const [cart, setCart] = useState([]);
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

  // Hàm để thêm vào giỏ hàng
  const addToCart = () => {
    const newItem = {
      id: productData?.id,
      name: productData?.name,
      price: productData?.salePrice,
      quantity: quantity,
    };
    const existingItemIndex = cart.findIndex((item) => item.id === newItem.id);

    if (existingItemIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ hàng
      setCart([...cart, newItem]);
    }

    // Ghi log để kiểm tra giỏ hàng
    console.log('Giỏ hàng:', cart);
  };

  return (
    <>
      <Container fixed>
        <Grid container spacing={0.3} sx={{ paddingTop: '80px' }}>
          <>
            <Grid item xs={4}>
              <Paper sx={{ padding: '16px' }}>
                <img src={imageUrl} alt="" style={{ width: '350px', height: '380px' }} />
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
                  <Button variant="contained" onClick={addToCart}>
                    Add To Cart
                  </Button>
                  <p>Số lượng trong giỏ hàng: {cart.reduce((total, item) => total + item.quantity, 0)}</p>
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
