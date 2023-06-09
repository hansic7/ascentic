import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartItemList, removeCart, updateCart } from "../../api/CartApi";
import { getCookie } from "../../utils/Cookies";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const res = await getCartItemList(getCookie("accessToken"));
    return res;
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartNum, thunkAPI) => {
    const res = await removeCart(cartNum, getCookie("accessToken"));
    return res;
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (cartList, thunkAPI) => {
    const res = await updateCart(cartList, getCookie("accessToken"));
    return res;
  }
);

const initialState = {
  cartItem: [],
  loading: false,
  checkedItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    decreaseCount: (state, action) => {
      const { cartNum } = action.payload;
      const cartItem = state.cartItem.find((item) => item.cartNum === cartNum);
      if (cartItem) {
        cartItem.prodCount--;
      }
    },
    increaseCount(state, action) {
      const { cartNum } = action.payload;
      const cartItem = state.cartItem.find((item) => item.cartNum === cartNum);
      if (cartItem) {
        cartItem.prodCount++;
      }
    },
    toggleCheckItem(state, action) {
      const cartNum = action.payload;
      const isChecked = state.checkedItems.includes(cartNum);
      if (isChecked) {
        state.checkedItems = state.checkedItems.filter(
          (item) => item !== cartNum
        );
      } else {
        state.checkedItems.push(cartNum);
      }
    },
    toggleAllCheckItem(state) {
      if (state.checkedItems.length === state.cartItem.length) {
        state.checkedItems = [];
      } else {
        const allCartNum = state.cartItem.map((item) => item.cartNum);
        state.checkedItems = [...allCartNum];
      }
    },
  },
  extraReducers: {
    [fetchCartItems.pending]: (state) => {
      state.loading = true;
      console.log("데이터 받아오는중.");
    },
    [fetchCartItems.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("데이터 받아왔음");
      state.cartItem = action.payload;
      state.checkedItems = action.payload.map((item) => item.cartNum);
      console.log(state.cartItem);
      console.log("state.cartItem끝");
    },
  },
});

export const {
  decreaseCount,
  increaseCount,
  toggleCheckItem,
  toggleAllCheckItem,
} = cartSlice.actions;

export default cartSlice.reducer;
