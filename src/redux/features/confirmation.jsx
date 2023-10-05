import { createSlice } from "@reduxjs/toolkit";

export const confirmation = createSlice({
    name: "confirmation",
    initialState: {
        value: false,
    },
    reducers: {
        changeStatus: (state, action) => {
            state.value = action.payload;
        },
    },
});

export default confirmation.reducer;

export const { changeStatus } = confirmation.actions;
