import { useAppDispatch, useAppSelector } from '@store/hooks'
import { actGetCategories } from '@store/categories/CategoriesSlice'
import { Container, Row, Col } from 'react-bootstrap'
import { Category } from '@components/eCommerce'
import { useEffect } from 'react'

const Categories = () => {
  const dispatch = useAppDispatch()
  const { loading, error, records } = useAppSelector(
    (state) => state.Categories,
  )
  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories())
    }
  }, [dispatch, records])

  const categoriesList =
    records.length > 0
      ? records.map((record) => (
          <Col
            xs={6}
            md={3}
            key={record.id}
            className='d-flex justify-content-center mb-5 mt-2'>
            <Category {...record} />
          </Col>
        ))
      : 'There are no categories'
  return (
    <Container>
      <Row>{categoriesList}</Row>
    </Container>
  )
}

export default Categories
