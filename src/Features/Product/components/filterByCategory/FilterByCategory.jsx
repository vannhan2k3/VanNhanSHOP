import { Box, Typography } from '@mui/material';
import './style.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import categoryApi from '../../../../api/categoryApi';

FilterByCategory.propTypes = {
  onChange: PropTypes.func.isRequired,
};

function FilterByCategory({ onChange }) {
  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await categoryApi.getAll();
        const { data } = res;
        const newObjCategory = data.map((x) => {
          return {
            id: x.id,
            name: x.name,
          };
        });
        setListCategory(newObjCategory);
      } catch (error) {}
    };
    fetchAPI();
  }, []);

  const handleOnclickCategory = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };
  return (
    <Box padding="8px">
      <Typography sx={{ fontWeight: 600 }}>Danh Mục Sản Phẩm</Typography>
      <ul className="fillter">
        {listCategory &&
          listCategory.map((item) => {
            return (
              <li className="item-filter" key={item.id} onClick={() => handleOnclickCategory(item)}>
                {item.name}
              </li>
            );
          })}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
