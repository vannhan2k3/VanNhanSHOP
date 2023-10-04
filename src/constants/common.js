export const STATIC_HOT = 'https://api.ezfrontend.com';
export const THUMBNAIL_PACEHOODER = 'https://placehold.co/400';

export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
