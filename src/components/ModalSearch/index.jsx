import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import productApi from '../../api/productpi';
import { useNavigate } from 'react-router-dom';

ModalSearch.propTypes = {};

function ModalSearch({ modalRef, searchItem, onResetInput, handleCloseModalSearch }) {
  const [listProduct, setListProduct] = useState([]);
  const [queryParams, setQueryParams] = useState({
    _page: 1,
    _limit: 120,
  });
  const navigate = useNavigate();
  useEffect(() => {
    async function fecthApi() {
      let res = await productApi.getAll(queryParams);
      setListProduct(res.data.data);
    }
    fecthApi();
  }, [queryParams]);

  useEffect(() => {
    setListProduct((prev) => {
      const data = prev?.filter((item) => {
        if (!item) {
          return [];
        }
        return item.name.toLowerCase().includes(searchItem.toLowerCase());
      });
      return data;
    });
    if (searchItem === '') {
      (async () => {
        let res = await productApi.getAll(queryParams);
        setListProduct(res.data.data);
      })();
    }
  }, [searchItem, queryParams]);

  const handleOnClick = (item) => {
    navigate(`/${item.id}`);
    onResetInput();
    handleCloseModalSearch();
  };
  return (
    <div className="wrap-modal-search" ref={modalRef}>
      <ul className="list">
        {listProduct?.map((item) => {
          return (
            <li className="item" onClick={() => handleOnClick(item)}>
              {item.name.toLowerCase()} - {item.salePrice} vnd
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ModalSearch;
