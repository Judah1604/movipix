import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./features/favourites";
import idReducer from "./features/id";

export const store = configureStore({
    reducer: {
        favourites: favouritesReducer,
        id: idReducer
    },
});
