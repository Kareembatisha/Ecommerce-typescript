import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GridList, Heading } from '@components/common'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  actGetProductsbycatPrefix,
  ProductscleanUp,
} from '@store/products/ProductsSlice'
import { Container } from 'react-bootstrap'
import { Product } from '@components/eCommerce'
import { Loading } from '@components/feedback'

const Products = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const { loading, error, records } = useAppSelector((state) => state.Products)
  const cartItems = useAppSelector((state) => state.cart.items)

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0 ,
  }))
  useEffect(() => {
    dispatch(actGetProductsbycatPrefix(params.prefix as string))
    return () => {
      dispatch(ProductscleanUp())
    }
  }, [dispatch, params])

  return (
    <>
      <Heading>
        <span className='text-capitalize'>{params.prefix}</span> Products
      </Heading>

      <Loading status={loading} error={error}>
        <GridList
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  )
}

export default Products
