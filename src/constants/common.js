export const STATIC_HOT = 'https://api.ezfrontend.com';
export const THUMBNAIL_PACEHOODER =
  'https://tenten.vn/tin-tuc/wp-content/uploads/2022/09/cach-ban-hang-online-hieu-qua.png';

export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
