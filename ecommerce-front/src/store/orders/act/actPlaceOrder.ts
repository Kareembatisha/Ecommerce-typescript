import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import axiosErrorHandler from '@utils/axiosErrorHandler'
import { RootState } from '@store/index'

const actPlaceOrder = createAsyncThunk(
  'orders/actPlaceOrder',
  async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    const { auth, cart } = getState() as RootState

    const cartItems = cart.productsFullInfo.map((el) => ({
      id: el.id,
      title: el.title,
      price: el.price,
      quantity: cart.items[el.id],
      img: el.img,
    }))

    try {
      const res = await axios.post('/orders', {
        userId: auth.user?.id,
        items: cartItems,
        subtotal,
      })
      return res.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  },
)

export default actPlaceOrder
