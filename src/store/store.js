import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { persistedReducer } from "./RootReducer";

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
    }),
})

export default store;