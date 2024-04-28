import useCart from '@hooks/useCart'
import { Heading } from '@components/common'
import { CartItemList, CartSubtotalPrice } from '@components/eCommerce'
import { Loading,LottieHandler } from '@components/feedback'

const Cart = () => {
 const { loading, error, products, changeQuantityHandler, removeItemHandler } = useCart()
  return (
    <>
      <Heading title='Cart' />
      <Loading status={loading} error={error} type='cart'>
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
          <LottieHandler message='Your Cart Is Empty' type="empty"/>
        )}
      </Loading>
    </>
  )
}

export default Cart
