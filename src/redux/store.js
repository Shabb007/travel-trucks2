import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './slices/campersSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    favorites: favoritesReducer,
  },
});
