import { createSlice } from '@reduxjs/toolkit'
import actGetProductsbycatPrefix from './act/actGetProductsbycatPrefix'
import {Tloading} from "@customTypes/shared"
import { TProduct } from '@customTypes/product'
interface ICategoriesState {
  records: TProduct[]
  loading: Tloading
  error: string | null
}

const initialState: ICategoriesState = {
  records: [],
  loading: 'idle',
  error: null,
}

const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    ProductscleanUp: (state) => {
      state.records = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsbycatPrefix.pending, (state) => {
      ;(state.loading = 'pending'), (state.error = null)
    })
    builder.addCase(actGetProductsbycatPrefix.fulfilled, (state, action) => {
      ;(state.loading = 'succeeded'), (state.records = action.payload)
    })
    builder.addCase(actGetProductsbycatPrefix.rejected, (state, action) => {
      state.loading = 'failed'
      if (action.payload && typeof action.payload == 'string') {
        state.error = action.payload
      }
    })
  },
})

export const { ProductscleanUp } = ProductsSlice.actions
export { actGetProductsbycatPrefix }
export default ProductsSlice.reducer
