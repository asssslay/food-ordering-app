import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.products.push({ 
                ...action.payload, 
                amount: 1,
                cartItemId: `${action.payload.id}_${Date.now()}`
            });
        },
        clearCart: (state) => {
            state.products = [];
        },
        incrementProductAmount: (state, action) => {
            const product = state.products.find(p => p.cartItemId === action.payload.cartItemId);
            if (product) {
                product.amount += 1;
            }
        },
        decrementProductAmount: (state, action) => {
            const productIndex = state.products.findIndex(p => p.cartItemId === action.payload.cartItemId);
            if (productIndex !== -1) {
                const product = state.products[productIndex];
                if (product.amount === 1) {
                    // Remove the product if amount would become 0
                    state.products.splice(productIndex, 1);
                } else {
                    product.amount -= 1;
                }
            }
        }
    }
});

export const cartProducts = state => state.cart.products;

export const { addToCart, clearCart, incrementProductAmount, decrementProductAmount } = cartSlice.actions;

export default cartSlice.reducer;