import { Heading } from '@components/common'
import { CartItemList, CartSubtotalPrice } from '@components/eCommerce'
import { Loading } from '@components/feedback'
import {
  actGetProductByItems,
  cartItemChangeQuantity,
  cartItemRemove,
  productsFullInfoCleanUp,
} from '@store/cart/CartSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useCallback, useEffect } from 'react'

const Cart = () => {
  const dispatch = useAppDispatch()

  const { items, ProductsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart,
  )
  useEffect(() => {
    dispatch(actGetProductByItems())
    return () => {
      dispatch(productsFullInfoCleanUp())
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
  return (
    <>
      <Heading>Cart</Heading>
      <Loading status={loading} error={error}>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />

            <CartSubtotalPrice products={products} />
          </>
        ) : (
          'Your Cart Is Empty'
        )}
      </Loading>
    </>
  )
}

export default Cart
