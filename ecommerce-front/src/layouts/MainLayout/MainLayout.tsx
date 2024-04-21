import { Container } from 'react-bootstrap'
import styles from '../MainLayout/styles.module.css'
import { Header, Footer } from '../../components/common'
import { Outlet } from 'react-router-dom'
const MainLayout = () => {
  const { container, wrapper } = styles
  return (
    <Container className={container}>
      <Header />
      <div className={wrapper}>
        <Outlet />
      </div>
      <Footer />
    </Container>
  )
}

export default MainLayout
