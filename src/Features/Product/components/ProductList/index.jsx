import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Pagination } from '@mui/material';
import SkeletonProductList from '../../../../components/Skeleton';
import ItemProduct from '../ItemProduct';
import productApi from '../../../../api/productpi';

ProductList.propTypes = {};

function ProductList(props) {
  const arrayList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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

  useEffect(() => {
    async function fecthApi() {
      let res = await productApi.getAll(queryParam);
      setListProduct(res.data.data);
      setPagination(res.pagination);
    }
    fecthApi();
    setIsLoading(false);
  }, [queryParam]);

  const handleOnchange = (e, page) => {
    setQueryParam({
      ...queryParam,
      _page: page,
    });
  };
  return (
    <Box sx={{ marginTop: '24px' }}>
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
