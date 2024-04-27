import {
  actGetProductByItems,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfo,
} from '@store/cart/CartSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useCallback, useEffect } from 'react'

const useCart = () => {
  const dispatch = useAppDispatch()

  const { items, ProductsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart,
  )
  useEffect(() => {
    const promise = dispatch(actGetProductByItems())
    return () => {
      dispatch(cleanCartProductsFullInfo())
      promise.abort()
    }
  }, [dispatch])

  const products = ProductsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }))

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }))
    },
    [dispatch],
  )

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id))
    },
    [dispatch],
  )
  return { loading, error, products, changeQuantityHandler, removeItemHandler }
}

export default useCart
