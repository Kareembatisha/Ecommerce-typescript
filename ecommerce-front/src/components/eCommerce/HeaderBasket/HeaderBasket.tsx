import Logo from '@assets/svg/cart.svg?react'
import styles from '../HeaderBasket/styles.module.css'
const HeaderBasket = () => {
  const { basketContainer, basketQuantity } = styles
  return (
    <div className={basketContainer}>
      <Logo title='basket' />
      <div className={basketQuantity}>0</div>
    </div>
  )
}

export default HeaderBasket
