// thunk
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Tcategory } from '@types'
import {axiosErrorHandler} from '@utils'

type TResponse = Tcategory[]

const actGetCategories = createAsyncThunk(
  'categories/actGetCategories',
  async (_, thunkAPI) => {
    const { rejectWithValue,signal } = thunkAPI
    try {
      const response = await axios.get<TResponse>('/categories',{signal})
      return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  },
)

export default actGetCategories
