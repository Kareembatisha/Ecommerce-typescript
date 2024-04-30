import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  actGetCategories,
  categoriesRecordsCleanUp,
} from '@store/categories/CategoriesSlice'

const useCategories = () => {
  const dispatch = useAppDispatch()

  const { loading, error, records } = useAppSelector(
    (state) => state.Categories,
  )

  useEffect(() => {
    const promise = dispatch(actGetCategories())

    return () => {
      promise.abort()
      dispatch(categoriesRecordsCleanUp())
    }
  }, [dispatch])

  return { loading, error, records }
}

export default useCategories
