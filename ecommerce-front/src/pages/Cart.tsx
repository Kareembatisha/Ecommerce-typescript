import useCart from '@hooks/useCart'
import { Heading } from '@components/common'
import { CartItemList, CartSubtotalPrice } from '@components/eCommerce'
import { Loading } from '@components/feedback'

const Cart = () => {
 const { loading, error, products, changeQuantityHandler, removeItemHandler } = useCart()
  return (
    <>
      <Heading title='Cart' />
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
