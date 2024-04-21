// thunk
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Tcategory } from '@customTypes/category'


type TResponse = Tcategory[]

const actGetCategories = createAsyncThunk(
  'categories/actGetCategories',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const response = await axios.get<TResponse>(
        'http://localhost:5005/categories',
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue('An Unexpected Error')
      }
    }
  },
)

export default actGetCategories
