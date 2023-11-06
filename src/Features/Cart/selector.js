import { createSelector } from '@reduxjs/toolkit';

const itemCartSelector = (state) => {
  console.log(state);
  return state.cart.itemCart;
};

export const itemCartCountSelector = createSelector(itemCartSelector, (itemCart) => {
  return itemCart.reduce((count, item) => count + item.quantity, 0);
});
export const itemCartTotalSelector = createSelector(itemCartSelector, (itemCart) => {
  return itemCart.reduce((total, item) => total + item.product.salePrice * item.quantity, 0);
});
