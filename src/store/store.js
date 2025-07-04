import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { trucksReducer } from "../redux/slices/trucksSlice";
import { filtersReducer } from "../redux/slices/filtersSlice";
import { persistedFavoriteReducer } from "../redux/slices/favoritesSlice";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";

const rootReducer = combineReducers({
  trucks: trucksReducer,
  filters: filtersReducer,
  favorite: persistedFavoriteReducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  reducer: rootReducer,
});

export const persistor = persistStore(store);
