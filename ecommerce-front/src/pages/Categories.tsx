import { useAppDispatch, useAppSelector } from '@store/hooks'
import { actGetCategories } from '@store/categories/CategoriesSlice'
import { Container} from 'react-bootstrap'
import { GridList, Heading } from '@components/common'
import { Category } from '@components/eCommerce'
import { useEffect } from 'react'
import { Loading } from '@components/feedback'

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

  
  return (
    <>
    <Heading>Categories</Heading>
      <Loading status={loading} error={error}>
        <GridList
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </>
  )
}

export default Categories
