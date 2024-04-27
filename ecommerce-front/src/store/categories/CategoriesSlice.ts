import { createSlice } from '@reduxjs/toolkit'
import actGetCategories from './act/actGetCategories'
import { Tloading,Tcategory ,isString} from '@types'
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
  reducers: {
    categoriesRecordsCleanUp: (state) => {
      state.records = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      ;(state.loading = 'pending'), (state.error = null)
    })
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      ;(state.loading = 'succeeded'), (state.records = action.payload)
    })
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = 'failed'
       if (isString(action.payload)) {
         state.error = action.payload
       }
    })
  },
})

export { actGetCategories }
export const { categoriesRecordsCleanUp } = CategoriesSlice.actions
export default CategoriesSlice.reducer
