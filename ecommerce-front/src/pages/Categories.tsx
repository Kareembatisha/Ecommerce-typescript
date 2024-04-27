
import { GridList, Heading } from '@components/common'
import { Category } from '@components/eCommerce'
import { Loading } from '@components/feedback'
import useCategories from '@hooks/useCategories'

const Categories = () => {
  const{loading,error,records}=useCategories()

  return (
    <>
      <Heading title="Categories"/>
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
