import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./services";

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(usersApi.middleware)
});