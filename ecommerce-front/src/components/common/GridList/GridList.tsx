import { LottieHandler } from "@components/feedback"
import React from "react"
import { Col, Row } from "react-bootstrap"

type GridListProps<T> = {
  records: T[]
  renderItem:(record:T)=>React.ReactNode
  emptyMessage:string
}
type HasId ={id?:number}

const GridList = <T extends HasId>({
  records,
  renderItem,
  emptyMessage,
}: GridListProps<T>) => {
  const categoriesList =
    records.length > 0 ? (
      records.map((record) => (
        <Col
          xs={6}
          md={3}
          key={record.id}
          className='d-flex justify-content-center mb-5 mt-2'>
          {renderItem(record)}
        </Col>
      ))
    ) : (
      <Col>
        <LottieHandler type='empty' message={emptyMessage} />
      </Col>
    )

  return <Row>{categoriesList}</Row>
}

export default GridList
