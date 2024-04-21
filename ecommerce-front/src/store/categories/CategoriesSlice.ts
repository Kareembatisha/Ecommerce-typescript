import { createSlice } from '@reduxjs/toolkit'
import actGetCategories from './act/actGetCategories'
import {Tloading} from "@customTypes/shared"
import {Tcategory} from "@customTypes/category"
interface ICategoriesState {
  records: Tcategory[]
  loading: Tloading
  error: string | null
}

const initialState: ICategoriesState = {
  records: [],
  loading: 'idle',
  error: null,
}

const CategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      ;(state.loading = 'pending'), (state.error = null)
    })
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      ;(state.loading = 'succeeded'), (state.records = action.payload)
    })
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = 'failed'
      if (action.payload && typeof action.payload == 'string') {
        state.error = action.payload
      }
    })
  },
})

export { actGetCategories }
export default CategoriesSlice.reducer
