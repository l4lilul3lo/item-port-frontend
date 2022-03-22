import { createSlice } from "@reduxjs/toolkit";

const keepZero = (int) => {
  const fixed = parseFloat(int.toFixed(2));

  if (fixed.toString().match(/[.].+/)[0].length === 2) {
    return fixed + "0";
  }
  return fixed.toString();
};

const getCount = (obj) => {
  let keys = Object.keys(obj);
  let total = keys
    .map((x) => {
      return obj[x].qty;
    })
    .reduce((a, b) => a + b);
  return total;
};

const getPrice = (obj) => {
  let keys = Object.keys(obj);
  if (keys.length === 0) {
    return 0;
  }
  let total = keys
    .map((x) => {
      let priceStr = obj[x].price;
      let priceFloat = parseFloat(priceStr.slice(1, priceStr.length));
      let qty = obj[x].qty;
      return priceFloat * qty;
    })
    .reduce((a, b) => a + b);

  return keepZero(total);
};
const initialState = {
  count: 0,
  items: {},
  total: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let productId = action.payload.id;
      let product = action.payload.info;
      if (state.items[productId]) {
        state.items[productId].qty += 1;
        state.count = getCount(state.items);
        state.total = getPrice(state.items);
        return;
      }
      state.items[productId] = { ...product, qty: 1 };
      state.count += 1;
      // state.count = Object.keys(state.items)
      state.total = getPrice(state.items);
    },

    removeFromCart: (state, action) => {
      let productId = action.payload;
      console.log(productId);
      state.count -= state.items[productId].qty;

      delete state.items[productId];
      state.total = getPrice(state.items);
    },

    updateQuantity: (state, action) => {
      let productId = action.payload.id;
      let qty = action.payload.qty;

      state.items[productId].qty = qty;
      state.count = getCount(state.items);
      state.total = getPrice(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export const selectCartCount = (state) => state.cart.count;
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export default cartSlice.reducer;

// so what if we have items stored in the cart

// turn items into an object

// if the item already exists, increase its quantity by one and increase count by 1.

// else add the item to cart, and decrease the quantity by 1.
