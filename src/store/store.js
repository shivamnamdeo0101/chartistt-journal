import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { persistedReducer } from "./RootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
const store = configureStore({
    
    reducer: persistedReducer,
    devTools:composeWithDevTools(),
    
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
    }),
})

export default store;