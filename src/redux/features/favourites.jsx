import { createSlice } from "@reduxjs/toolkit";

export const favourites = createSlice({
    name: "favourites",
    initialState: {
        value: [],
    },
    reducers: {
        add: (state, action) => {
            const isItemExists = state.value.some(
                (item) => item.id === action.payload.id
            );

            if (!isItemExists) {
                state.value = [...state.value, action.payload];
            }
        },
        deleteItem: (state, action) => {
            state.value = state.value.filter(
                (item) => item.id !== action.payload
            );
        },
    },
});

export default favourites.reducer;

export const { add, deleteItem } = favourites.actions;
