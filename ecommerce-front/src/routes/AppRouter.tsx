import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '@layouts/MainLayout/MainLayout'
import Home from '@pages/Home'
import Wishlist from '@pages/Wishlist'
import Categories from '@pages/Categories'
import Products from '@pages/Products'
import AboutUs from '@pages/AboutUs'
import Login from '@pages/Login'
import Register from '@pages/Register'
import Error from '@pages/Error'
import Cart from '@pages/Cart'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'wishlist',
        element: <Wishlist />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'categories/products/:prefix',
        loader: ({ params }) => {
          if (
            typeof params.prefix !== 'string' ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response('bad request', {
              statusText: 'category not found',
              status: 400,
            })
          }

          return true
        },
        element: <Products />,
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
])
const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
