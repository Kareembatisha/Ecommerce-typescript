import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  actGetProductsbycatPrefix,
  cleanUpProductsRecords,
} from '@store/products/ProductsSlice'

const useProducts = () => {
  const params = useParams()
  const productPrefix = params.prefix
  const dispatch = useAppDispatch()
  const { loading, error, records } = useAppSelector((state) => state.Products)
  const cartItems = useAppSelector((state) => state.cart.items)
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId)

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishListItemsId.includes(el.id),
  }))
  useEffect(() => {
    const promise = dispatch(actGetProductsbycatPrefix(params.prefix as string))
    return () => {
      dispatch(cleanUpProductsRecords())
      promise.abort()
    }
  }, [dispatch, params])
  return { loading, error, productsFullInfo, productPrefix }
}

export default useProducts
