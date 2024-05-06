import { useEffect, useState, memo } from 'react'
import { useAppDispatch } from '@store/hooks'
import { actLikeToggle } from '@store/Wishlist/WishlistSlice'
import { addToCart } from '@store/cart/CartSlice'
import ProductInfo from '../ProductInfo/ProductInfo'
import { Button, Spinner, Modal } from 'react-bootstrap'
import LikeFill from '@assets/svg/like-fill.svg?react'
import Like from '@assets/svg/like.svg?react'
import { TProduct } from '@types'

import styles from './styles.module.css'
const { maximumNotice, wishlistBtn } = styles

const Product = memo(
  ({
    id,
    title,
    price,
    img,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const dispatch = useAppDispatch()

    const [showModal, setShowModal] = useState(false)
    const [isBtnDisabled, setIsBtnDisabled] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const currentRemainingQuantity = (max as number) - (quantity ?? 0)

    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false

    useEffect(() => {
      if (!isBtnDisabled) {
        return
      }

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
      if (isAuthenticated) {
        if (!isLoading) {
          setIsLoading(true)
          dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false))
        }
      } else {
        setShowModal(true)
      }
    }

    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>

        <>
          <ProductInfo title={title} price={price} img={img} direction='column'>
            <div className={wishlistBtn} onClick={likeToggleHandler}>
              {isLoading ? (
                <Spinner animation='border' size='sm' variant='primary' />
              ) : isLiked ? (
                <LikeFill />
              ) : (
                <Like />
              )}
            </div>
            <p className={maximumNotice}>
              {quantityReachedToMax
                ? 'You reached to the limit'
                : `You can add ${currentRemainingQuantity} item(s)`}
            </p>
            <Button
              variant='info'
              style={{ color: 'white', width: '100%' }}
              onClick={addToCartHandler}
              disabled={isBtnDisabled || quantityReachedToMax}>
              {isBtnDisabled ? (
                <>
                  <Spinner animation='border' size='sm' /> Loading...
                </>
              ) : (
                'Add to cart'
              )}
            </Button>
          </ProductInfo>
        </>
      </>
    )
  },
)

export default Product
