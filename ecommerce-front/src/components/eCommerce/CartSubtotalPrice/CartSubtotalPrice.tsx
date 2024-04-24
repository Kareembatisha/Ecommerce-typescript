import styles from './styles.module.css'
import { TProduct } from '@customTypes/product'

type CartSubtotalPriceProps = { products: TProduct[] }

const CartSubtotalPrice = ({ products }: CartSubtotalPriceProps) => {
  const subTotal = products.reduce((acc, el) => {
    const price = el.price
    const quantity = el.quantity
    if (quantity && typeof quantity === 'number') {
      return acc + price * quantity
    } else {
      return acc
    }
  }, 0)
  return (
    <div className={styles.container}>
      <span>Subtotal:</span>
      <span>{subTotal.toFixed(2)} EGP</span>
    </div>
  )
}

export default CartSubtotalPrice
