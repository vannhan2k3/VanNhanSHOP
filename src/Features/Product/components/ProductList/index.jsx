import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Pagination, Paper } from '@mui/material';
import SkeletonProductList from '../../../../components/Skeleton';
import ItemProduct from '../ItemProduct';
import productApi from '../../../../api/productpi';
import ProductFilter from '../ProductFilter';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';

ProductList.propTypes = {};

function ProductList(props) {
  const location = useLocation();
  const navigation = useNavigate();
  console.log('hahaha', location);
  const [isLoading, setIsLoading] = useState(true);
  const [queryParam, setQueryParam] = useState({
    _page: 1,
    _limit: 12,
  });
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 12,
  });
  const [listProduct, setListProduct] = useState();

  //
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      // _sort: params._sort || "salePrice:ASC",
      // isPromotion: params.isPromotion === "true",
      // isFreeShip: params.isFreeShip === "true",
    };
  }, [location.search]);

  //
  useEffect(() => {
    async function fecthApi() {
      let res = await productApi.getAll(queryParams);
      setListProduct(res.data.data);
      setPagination(res.pagination);
    }
    fecthApi();
    setIsLoading(false);
  }, [queryParams]);

  const handleOnchange = (e, page) => {
    // setQueryParam({
    //   ...queryParam,
    //   _page: page,
    // });
    const newFillter = {
      ...queryParams,
      _page: page,
    };
    navigation({
      pathname: location.pathname,
      search: queryString.stringify(newFillter),
    });
  };
  const handleOnchangeFilter = (value) => {
    // setQueryParam({
    //   ...queryParam,
    //   'category.id': id,
    // });
    console.log('newfilter: ', value);
    const newFillter = {
      ...queryParams,
      ...value,
    };
    console.log('newfilter: ', newFillter);
    navigation({
      pathname: location.pathname,
      search: queryString.stringify(newFillter),
    });
  };
  return (
    <Box sx={{ marginTop: '24px' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper elevation={0}>
            <ProductFilter onChange={handleOnchangeFilter} filters={queryParams} />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            {listProduct?.map((item, index) => {
              return (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    {isLoading ? <SkeletonProductList length={1} /> : <ItemProduct product={item} />}
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Grid>
        {/* {listProduct?.map((item, index) => {
          return (
            <>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                {isLoading ? <SkeletonProductList length={1} /> : <ItemProduct product={item} />}
              </Grid>
            </>
          );
        })} */}
      </Grid>

      <Box sx={{ display: 'flex', width: '100%', margin: '18px 0' }}>
        <Pagination
          page={pagination.page || 1}
          count={Math.ceil(pagination.total.data / pagination.limit || 10)}
          color="primary"
          sx={{ margin: 'auto' }}
          onChange={handleOnchange}
        />
      </Box>
    </Box>
  );
}

export default ProductList;
