import { memo, useEffect, useState } from 'react'
import { TProduct } from '@types'
import { addToCart } from '@store/cart/CartSlice'
import { Button, Spinner } from 'react-bootstrap'
import Like from '@assets/svg/like.svg?react'
import LikeFill from '@assets/svg/like-fill.svg?react'
import styles from './styles.module.css'
import { useAppDispatch } from '@store/hooks'
import { actLikeToggle } from '@store/Wishlist/WishlistSlice'

const { product, productImg, maximumNotice, WishlistBtn } = styles

const Product = memo(
  ({ id, title, price, img, max, quantity, isLiked }: TProduct) => {

    const dispatch = useAppDispatch()

    const [isBtnDisabled, setIsBtnDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const currentRemainingQuantity = max - (quantity ?? 0)
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false

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

    const likeToggleHandler = () => {
      if (!isLoading) {
        setIsLoading(true)
        dispatch(actLikeToggle(id))
          .unwrap()
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(false))
      }
    }

    return (
      <div className={product}>
        <div className={WishlistBtn} onClick={likeToggleHandler}>
          {isLoading ? (
            <Spinner animation='border' size='sm' variant='primary' />
          ) : isLiked ? (
            <LikeFill />
          ) : (
            <Like />
          )}
        </div>
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
  },
)

export default Product
