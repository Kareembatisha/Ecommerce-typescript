import useProducts from '@hooks/useProducts'
import { GridList, Heading } from '@components/common'

import { Product } from '@components/eCommerce'
import { Loading } from '@components/feedback'

const Products = () => {
  const { productPrefix, loading, error, productsFullInfo } = useProducts()

  return (
    <>
      <Heading title={`${productPrefix?.toUpperCase()} Products`} />

      <Loading status={loading} error={error} type='product'>
        <GridList
          emptyMessage='No products found...'
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  )
}

export default Products
