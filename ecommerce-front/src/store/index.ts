import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import Categories from './categories/CategoriesSlice'
import products from './products/ProductsSlice'
import cart from './cart/CartSlice'
import wishlist from './Wishlist/WishlistSlice'
import auth from './auth/authSlice'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth'],
}

const authPersistConfig = {
  key: 'auth',
  storage,
  whiteList: ['user', 'accessToken'],
}

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items'],
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  Categories,
  products,
  cart: persistReducer(cartPersistConfig, cart),
  wishlist: wishlist,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store)

export { store, persistor }
