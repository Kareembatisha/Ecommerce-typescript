// thunk
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { TProduct } from '@types'
import { axiosErrorHandler } from '@utils'

type TResponse = TProduct[]

const actGetProductsbycatPrefix = createAsyncThunk(
  'products/actGetProductsbycatPrefix',
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI
    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`,
        {
          signal,
        },
      )
      return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  },
)

export default actGetProductsbycatPrefix
