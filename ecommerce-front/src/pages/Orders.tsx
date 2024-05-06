import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@store/hooks'
import { actGetUserOrders } from '@store/orders/ordersSlice'
import { resetOrderStatus } from '@store/orders/ordersSlice'
import { ProductInfo } from '@components/eCommerce'
import { Heading } from '@components/common'
import { Table, Modal } from 'react-bootstrap'
import { TProduct } from '@types'

const Orders = () => {
  const dispatch = useAppDispatch()

  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([])

  const { ordersList } = useAppSelector((state) => state.orders)

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedProduct([])
  }

  const viewDetailsHandler = (id: number) => {
    const productDetails = ordersList.find((order) => order.id === id)

    const newItems = productDetails?.items ?? []
    setShowModal(true)
    setSelectedProduct((prev) => [...prev, ...newItems])
  }

  useEffect(() => {
    const promise = dispatch(actGetUserOrders())

    return () => {
      promise.abort()
      dispatch(resetOrderStatus())
    }
  }, [dispatch])

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Products Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              img={el.img}
              price={el.price}
              style={{ marginBottom: '10px' }}
              quantity={el.quantity}
            />
          ))}
        </Modal.Body>
      </Modal>
      <Heading title='My Order' />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Items</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {ordersList.map((el) => (
            <tr key={el.id}>
              <td>#{el.id}</td>
              <td>
                {el.items.length} Item(s){' / '}
                <span
                  onClick={() => viewDetailsHandler(el.id)}
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                  Product Details
                </span>
              </td>
              <td>{el.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Orders
