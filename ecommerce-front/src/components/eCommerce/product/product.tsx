import { memo, useEffect, useState } from 'react'
import { TProduct } from '@customTypes/product'
import { addToCart } from '@store/cart/CartSlice'
import { Button, Spinner } from 'react-bootstrap'
import styles from './styles.module.css'
import { useAppDispatch } from '@store/hooks'

const { product, productImg, maximumNotice } = styles

const Product = memo(({ id, title, price, img, max, quantity }: TProduct) => {
  
  const dispatch = useAppDispatch()

  const [isBtnDisabled, setIsBtnDisabled] = useState(false)

  const currentRemainingQuantity = max - (quantity ?? 0)
  const quantityReachedToMax = currentRemainingQuantity  <= 0 ? true : false;

  useEffect(() => {
    if (!isBtnDisabled) {
      return
    }
    setIsBtnDisabled(true)

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false)
    }, 300)

    return () => clearTimeout(debounce)
  }, [isBtnDisabled])

  const addToCartHandler = () => {
    dispatch(addToCart(id))
    setIsBtnDisabled(true)
  }
  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price}EGP</h3>
      <p className={maximumNotice}>
        {quantityReachedToMax
          ? 'You reach to the limit '
          : `You can add ${currentRemainingQuantity} item(s)`}
      </p>
      <Button
        variant='info'
        onClick={addToCartHandler}
        disabled={isBtnDisabled || quantityReachedToMax}
        style={{ color: 'white' }}>
        {isBtnDisabled ? (
          <>
            <Spinner animation='border' size='sm' />
            Loading...
          </>
        ) : (
          'Add to cart'
        )}
      </Button>
    </div>
  )
})

export default Product
