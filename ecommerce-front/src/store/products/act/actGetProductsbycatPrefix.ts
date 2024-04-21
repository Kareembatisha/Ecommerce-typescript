// thunk
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { TProduct } from '@customTypes/product'


type TResponse = TProduct[]

const actGetProductsbycatPrefix = createAsyncThunk(
  'products/actGetProductsbycatPrefix',
  async (prefix:string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const response = await axios.get<TResponse>(
        `http://localhost:5005/products?cat_prefix=${prefix}`,
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

export default actGetProductsbycatPrefix
