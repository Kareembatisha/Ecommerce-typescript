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
import Categories from './categories/CategoriesSlice'
import cart from './cart/CartSlice'
import Products from './products/ProductsSlice'
import storage from 'redux-persist/lib/storage'
import wishlist from './Wishlist/WishlistSlice'

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items'],
}
const wishlistPersistConfig = {
  key: 'wishlist',
  storage,
  whitelist: ['itemsId'],
}

const rootReducer = combineReducers({
  Categories,
  Products,
  cart: persistReducer(cartPersistConfig, cart),
  wishlist: persistReducer(wishlistPersistConfig, wishlist),
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
const persistor = persistStore(store)
export { store, persistor }
