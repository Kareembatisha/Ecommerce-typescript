import { TProduct, isString, Tloading } from '@types'
import { createSlice } from '@reduxjs/toolkit'
import {
  getCartTotalQuantitySelector,
  itemQuantityAvailabilityCheckingSelector,
} from './selectors'
import actGetProductByItems from './act/actGetProductByItems'

interface ICartState {
  items: { [key: string]: number }
  ProductsFullInfo: TProduct[]
  loading: Tloading
  error: null | string
}

const initialState: ICartState = {
  items: {},
  ProductsFullInfo: [],
  loading: 'idle',
  error: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cleanCartProductsFullInfo: (state) => {
      state.ProductsFullInfo = []
    },
    addToCart: (state, action) => {
      const id = action.payload
      if (state.items[id]) {
        state.items[id]++
      } else {
        state.items[id] = 1
      }
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload]
      state.ProductsFullInfo = state.ProductsFullInfo.filter(
        (el) => el.id !== action.payload,
      )
    },
  },
  extraReducers(builder) {
    builder.addCase(actGetProductByItems.pending, (state) => {
      ;(state.loading = 'pending'), (state.error = null)
    })
    builder.addCase(actGetProductByItems.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.ProductsFullInfo = action.payload
    })
    builder.addCase(actGetProductByItems.rejected, (state, action) => {
      state.loading = 'failed'
      if (isString( action.payload) ) {
        state.error = action.payload
      }
    })
  },
})

export {
  getCartTotalQuantitySelector,
  actGetProductByItems,
  itemQuantityAvailabilityCheckingSelector,
}
export const {
  addToCart,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfo,
} = cartSlice.actions
export default cartSlice.reducer
