import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  actGetProductsbycatPrefix,
  ProductscleanUp,
} from '@store/products/ProductsSlice'
import { Container, Row, Col } from 'react-bootstrap'
import { Product } from '@components/eCommerce'

const Products = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const { loading, error, records } = useAppSelector((state) => state.Products)
  useEffect(() => {
    dispatch(actGetProductsbycatPrefix(params.prefix as string))
    return () => {
      dispatch(ProductscleanUp())
    }
  }, [dispatch, params])

  const productsList =
    records.length > 0
      ? records.map((record) => (
          <Col
            xs={6}
            md={3}
            key={record.id}
            className='d-flex justify-content-center mb-5 mt-2'>
            <Product {...record} />
          </Col>
        ))
      : 'There are no categories'
  return (
    <Container>
      <Row>{productsList}</Row>
    </Container>
  )
}

export default Products
