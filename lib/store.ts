import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cvReducer from "./cvSlice";


type RootStateCV = ReturnType<typeof cvReducer>;

const persistConfig: PersistConfig<RootStateCV> = {
  key: "cv-builder",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cvReducer);


export const store = configureStore({
  reducer: {
    cv: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});


export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
