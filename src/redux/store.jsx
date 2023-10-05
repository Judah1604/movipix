import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./features/favourites";
import detailsReducer from "./features/details";
import confirmationReducer from "./features/confirmation";

export const store = configureStore({
    reducer: {
        favourites: favouritesReducer,
        details: detailsReducer,
        confirmation: confirmationReducer
    },
});
