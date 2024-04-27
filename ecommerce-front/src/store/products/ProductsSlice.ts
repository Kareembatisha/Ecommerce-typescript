import { createSlice } from '@reduxjs/toolkit'
import actGetProductsbycatPrefix from './act/actGetProductsbycatPrefix'
import {Tloading,TProduct,isString} from "@types"
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
    cleanUpProductsRecords: (state) => {
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
       if (isString(action.payload)) {
         state.error = action.payload
       }
    })
  },
})

export const { cleanUpProductsRecords } = ProductsSlice.actions
export { actGetProductsbycatPrefix }
export default ProductsSlice.reducer
