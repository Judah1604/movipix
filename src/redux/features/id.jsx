import { createSlice } from "@reduxjs/toolkit";

export const id = createSlice({
    name: "id",
    initialState: {
        value: 0,
    },
    reducers: {
        changeId: (state, action) => {
            state.value = action.payload
        }
    },
});

export default id.reducer;

export const { changeId } = id.actions;
