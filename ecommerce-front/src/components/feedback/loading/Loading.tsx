import { Tloading } from '@types'
import React from 'react'
import CategorySkeleton from '../skeletons/CategorySkeletons/CategorySkeletons'
import CartSkeleton from '../skeletons/CartSkeletons/CartSkeletons'
import ProductSkeleton from '../skeletons/ProductSkeleton/ProductSkeleton'
import LottieHandler from '../LottieHandler/LottieHandler'


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
  type = "category",
}: LoadingProps) => {
  const Component = skeletonsTypes[type]

  if (status === 'pending') {
    return <Component />
  }
  if (status === 'failed') {
    return <p><LottieHandler  type='error' message={error as string} /></p>
  }
  return <>{children}</>
}

export default Loading
