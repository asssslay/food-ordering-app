import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  error: null,
  status: "idle",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.products = action.payload.data || [];  // Ensure we always have an array
      console.log('Products updated:', state.products); // Debug log
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = "pending";
      state.products = [];  // Clear products while loading
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.products = [];  // Clear products on error
    });
  },
});

export const { getProducts } = productsSlice.actions;

export default productsSlice.reducer;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      "http://localhost:8080/api/products-by-categories"
    );
    const data = await response.json();
    return data;
  }
);

export const selectAllProducts = (state) => state.products;
