import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { id: 0, status: false };

export const details = createSlice({
    name: "details",
    initialState: {
        value: initialStateValue
    },
    reducers: {
        update: (state, action) => {
            state.value = action.payload
        }
    },
});

export default details.reducer;

export const { update } = details.actions;
