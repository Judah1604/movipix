import { createSlice } from "@reduxjs/toolkit";

export const albumsStatus = createSlice({
    name: "albumsStatus",
    initialState: {
        value: false,
    },
    reducers: {
        changeAlbumsStatus: (state, action) => {
            state.value = action.payload;
        },
    },
});

export default albumsStatus.reducer;

export const { changeAlbumsStatus } = albumsStatus.actions;
