import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  actGetCategories,
  categoriesRecordsCleanUp,
} from '@store/categories/CategoriesSlice'
import { useEffect } from 'react'
const useCategories = () => {
  const dispatch = useAppDispatch()
  const { loading, error, records } = useAppSelector(
    (state) => state.Categories,
  )
  useEffect(() => {
    const promise = dispatch(actGetCategories())

    return () => {
      dispatch(categoriesRecordsCleanUp())
      promise.abort()
    }
  }, [dispatch])
  return { loading, error, records }
}

export default useCategories
