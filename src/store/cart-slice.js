import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {quantity: 0, items: []},
    reducers: {
        updateCart(state, action){
            state.quantity = action.payload.quantity;
            state.items = action.payload.items
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;