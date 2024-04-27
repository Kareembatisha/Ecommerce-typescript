import HeaderCounter from "../HeaderCounter/HeaderCounter"
import WishlistIcon from '@assets/svg/Wishlist.svg?react'
import CartIcon from '@assets/svg/cart.svg?react'
import { getCartTotalQuantitySelector } from "@store/cart/selectors"
import { useAppSelector } from "@store/hooks"
import styles from './styles.module.css'


const { headerLeftBar } = styles
 
const HeaderLeftBar = () => {
     const wishlistTotalQuantity = useAppSelector(
       (state) => state.wishlist.itemsId.length,
     )
     const cartTotalQuantity = useAppSelector((state) =>
       getCartTotalQuantitySelector(state),
     )
  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        to='wishlist'
        title='wishlist'
        totalQuantity={wishlistTotalQuantity}
        svgIcon={<WishlistIcon title='wishlist' />}
      />
      <HeaderCounter
        to='cart'
        title='cart'
        totalQuantity={cartTotalQuantity}
        svgIcon={<CartIcon title='cart' />}
      />
    </div>
  )
}

export default HeaderLeftBar
