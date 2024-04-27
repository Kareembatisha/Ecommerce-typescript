import {
  actGetWishlist,
  cleanWishlistProductsFullInfo,
} from '@store/Wishlist/WishlistSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useEffect } from 'react'
const useWishlist = () => {
  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.wishlist,
  )
  const cartItems = useAppSelector((state) => state.cart.items)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const promise = dispatch(actGetWishlist())
    return () => {
      dispatch(cleanWishlistProductsFullInfo())
      promise.abort()
    }
  }, [dispatch])

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: true,
  }))
  return { loading, error, records }
}

export default useWishlist
