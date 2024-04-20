import { Container } from 'react-bootstrap'
import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom'
const Error = () => {
  const error = useRouteError()
  let errorstatus: number
  let errorstatustext: string

  if (isRouteErrorResponse(error)) {
    errorstatus = error.status
    errorstatustext = error.statusText
  } else {
    errorstatus = 404
    errorstatustext = 'Page Not Found'
  }
  return (
    <Container className='notFound'>
      <h1>{errorstatus}</h1>
      <p>{errorstatustext}</p>
      <Link to='/' replace={true}>
        wrong Page please return to home Page
      </Link>
    </Container>
  )
}

export default Error
