import { TProduct } from './product.types'

export type TOrderItem = {
  id: number
  subtotal: number
  items: TProduct[]
}
