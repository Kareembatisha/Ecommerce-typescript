import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
const MainLayout = lazy(() => import('@layouts/MainLayout/MainLayout')) 
const Home = lazy(() => import('@pages/Home')) 
const Wishlist = lazy(() => import('@pages/Wishlist')) 
const Categories = lazy(() => import('@pages/Categories')) 
const Products = lazy(() => import('@pages/Products')) 
const AboutUs = lazy(() => import('@pages/AboutUs')) 
const Login = lazy(() => import('@pages/Login')) 
const Register = lazy(() => import('@pages/Register')) 
const Cart = lazy(() => import('@pages/Cart')) 
const Error = lazy(() => import('@pages/Error')) 

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback='loading wait ...'>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback='loading wait ...'>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback='loading wait ...'>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <Suspense fallback='loading wait ...'>
            <Wishlist />
          </Suspense>
        ),
      },
      {
        path: 'categories',
        element: (
          <Suspense fallback='loading wait ...'>
            <Categories />
          </Suspense>
        ),
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
        element: (
          <Suspense fallback='loading wait ...'>
            <Products />
          </Suspense>
        ),
      },
      {
        path: 'about-us',
        element: (
          <Suspense fallback='loading wait ...'>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback='loading wait ...'>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback='loading wait ...'>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
])
const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
