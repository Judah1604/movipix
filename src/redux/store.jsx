import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./features/favourites";
import detailsReducer from "./features/details";

export const store = configureStore({
    reducer: {
        favourites: favouritesReducer,
        details: detailsReducer,
    },
});
