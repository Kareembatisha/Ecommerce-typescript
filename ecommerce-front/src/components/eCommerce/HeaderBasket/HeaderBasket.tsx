import { useEffect, useState } from 'react'
import { useAppSelector } from '@store/hooks'
import { getCartTotalQuantitySelector } from '@store/cart/CartSlice'
import Logo from '@assets/svg/cart.svg?react'
import styles from '../HeaderBasket/styles.module.css'
import { useNavigate } from 'react-router-dom'

const { container, totalNum, pumpAnimate, iconWrapper } = styles

const HeaderBasket = () => {
  const navigate = useNavigate()
  const [isAnimate, setIsAnimate] = useState(false)
  const totalQuantity = useAppSelector((state) =>
    getCartTotalQuantitySelector(state),
  )
  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ''}`

  useEffect(() => {
    if(!totalQuantity){
      return
    }
    setIsAnimate(true)

    const debounce = setTimeout(() => {
      setIsAnimate(false)
    }, 300)

    return () => clearTimeout(debounce)
  }, [totalQuantity])

  return (
    <div className={container} onClick={() => navigate('/cart')}>
      <div className={iconWrapper}>
        <Logo title='basket' />
        {totalQuantity > 0 && (
          <div className={quantityStyle}>{totalQuantity}</div>
        )}

      </div>
      <h3>Cart</h3>
    </div>
  )
}

export default HeaderBasket
