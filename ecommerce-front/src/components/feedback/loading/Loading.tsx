import CategorySkeleton from '../skeletons/CategorySkeletons/CategorySkeletons'
import ProductSkeleton from '../skeletons/ProductSkeleton/ProductSkeleton'
import CartSkeleton from '../skeletons/CartSkeletons/CartSkeletons'
import LottieHandler from '../LottieHandler/LottieHandler'

import { Tloading } from '@types'

const skeletonsTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
}

type LoadingProps = {
  status: Tloading
  error: null | string
  children: React.ReactNode
  type?: keyof typeof skeletonsTypes
}

const Loading = ({
  status,
  error,
  children,
  type = 'category',
}: LoadingProps) => {
  const Component = skeletonsTypes[type]

  if (status === 'pending') {
    return <Component />
  }
  if (status === 'failed') {
    return (
      <div>
        <LottieHandler type='error' message={error as string} />
      </div>
    )
  }
  return <div>{children}</div>
}

export default Loading
