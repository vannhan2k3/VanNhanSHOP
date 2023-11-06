import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showCart: false,
    itemCart: [],
  },
  reducers: {
    showMiniCart: (state) => {
      state.showCart = true;
    },
    hideMinicart: (state) => {
      state.showCart = false;
    },
    addTocart: (state, action) => {
      console.log('check action ', action);
      const newItem = action.payload;
      //{id,product,quantity}
      const index = state.itemCart.findIndex((x) => x.id === newItem.id);
      if (index >= 0) {
        state.itemCart[index].quantity += newItem.quantity;
      } else {
        state.itemCart.push(newItem);
      }
    },
    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const index = state.itemCart.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.itemCart[index].quantity = quantity;
      }
    },
    removeItemCart: (state, action) => {
      const id = action.payload;
      console.log('loosc ay di', id);
      state.itemCart = state.itemCart.filter((x) => x.id !== id);
    },
  },
});

export const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMinicart, addTocart, setQuantity, removeItemCart } = actions;
export default reducer;
