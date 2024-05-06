import { createSlice } from '@reduxjs/toolkit'
import actPlaceOrder from './act/actPlaceOrder'
import actGetUserOrders from './act/actGetUserOrders'
import { Tloading, isString, TOrderItem } from '@types'

interface IOrdersState {
  ordersList: TOrderItem[]
  loading: Tloading
  error: string | null
}

const initialState: IOrdersState = {
  ordersList: [],
  loading: 'idle',
  error: null,
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.error = null
      state.loading = 'idle'
    },
  },
  extraReducers: (builder) => {
    // place order
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
      state.loading = 'succeeded'
    })
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = 'failed'
      if (isString(action.payload)) {
        state.error = action.payload
      }
    })
    // get order by logged in user
    builder.addCase(actGetUserOrders.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(actGetUserOrders.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.ordersList = action.payload
    })
    builder.addCase(actGetUserOrders.rejected, (state, action) => {
      state.loading = 'failed'
      if (isString(action.payload)) {
        state.error = action.payload
      }
    })
  },
})

export { actPlaceOrder, actGetUserOrders }
export const { resetOrderStatus } = ordersSlice.actions
export default ordersSlice.reducer
