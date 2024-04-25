import {
  actGetWishlist,
  productsFullInfoCleanUp,
} from '@store/Wishlist/WishlistSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useEffect } from 'react'
import { GridList, Heading } from '@components/common'
import { Product } from '@components/eCommerce'
import { Loading } from '@components/feedback'
import { TProduct } from '@customTypes/product'

const Wishlist = () => {
  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.wishlist,
  )
  const cartItems = useAppSelector((state) => state.cart.items)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(actGetWishlist())
    return () => {
      dispatch(productsFullInfoCleanUp())
    }
  }, [dispatch])

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: true,
  }))
  return (
    <>
      <Heading>Your Wishlist</Heading>
      <Loading status={loading} error={error}>
        <GridList<TProduct>
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  )
}

export default Wishlist
