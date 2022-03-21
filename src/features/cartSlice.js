import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  items: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      state.count = state.items.length;
    },

    removeFromCart: (state, action) => {
      const matchId = (id) => id === action.payload.id;
      let removeIndex = state.items.findIndex(matchId);
      state.items.splice(removeIndex, 1);
      state.count = state.items.length;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCartCount = (state) => state.cart.count;
export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer;
