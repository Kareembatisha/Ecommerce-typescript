import { NavLink } from 'react-router-dom'
import { HeaderBasket } from '../../eCommerce'
import { Badge, Container, Nav, Navbar } from 'react-bootstrap'
import styles from '../Header/styles.module.css'
const Header = () => {
  const { headerContainer, headerLogo } = styles
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>our</span> <Badge bg='info'>ecom</Badge>
        </h1>
        <HeaderBasket />
      </div>
      <Navbar
        expand='lg'
        className='bg-body-tertiary'
        bg='dark'
        data-bs-theme='dark'>
        <Container>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link as={NavLink} to='/'>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to='categories'>
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to='about-us'>
                About
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to='login'>
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to='register'>
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
