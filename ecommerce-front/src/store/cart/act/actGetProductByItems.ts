import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@store/index'
import axios from 'axios'
import { TProduct } from '@types'
import { axiosErrorHandler } from '@utils'

type TResponse = TProduct[]

const actGetProductByItems = createAsyncThunk(
  'cart/actGetProductByItems',
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState,signal } = thunkAPI
    const { cart } = getState() as RootState
    const itemsId = Object.keys(cart.items)

    if (!itemsId.length) {
      return fulfillWithValue([])
    }

    try {
      const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join('&')
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`,{signal}
      )
      return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  },
)

export default actGetProductByItems
