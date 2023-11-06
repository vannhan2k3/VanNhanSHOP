import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import FilterByCategory from '../filterByCategory/FilterByCategory';
import FilterByPrice from '../FilterByPrice';

ProductFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

function ProductFilter({ onChange, filters }) {
  const handlFiltersChange = (newCategroyId) => {
    if (!onChange) return;
    const newFilters = {
      ...filters,
      'category.id': newCategroyId,
    };
    onChange(newFilters);
  };
  const handleChange = (values) => {
    if (!onChange) return;
    onChange(values);
  };
  return (
    <Box>
      <FilterByCategory onChange={handlFiltersChange} />
      <FilterByPrice onChange={handleChange} />
      {/* <FilterByService filters={filters} onChange={handleChange} />  */}
    </Box>
  );
}

export default ProductFilter;
