import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./features/favourites";

export const store = configureStore({
    reducer: {
        favourites: favouritesReducer,
    },
});
