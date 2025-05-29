// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { combineReducers } from 'redux';

import authReducer from './slices/authSlice';
import blogReducer from './slices/blogSlice';

// Configuration for persistence
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // ⬅️ only persist the 'auth' slice
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  blogs: blogReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ⬅️ required for redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);
