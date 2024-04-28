import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { LottieHandler, PageSuspenseFallback } from '@components/feedback'
const MainLayout = lazy(() => import('@layouts/MainLayout/MainLayout'))
const Home = lazy(() => import('@pages/Home'))
const Wishlist = lazy(() => import('@pages/Wishlist'))
const Categories = lazy(() => import('@pages/Categories'))
const Products = lazy(() => import('@pages/Products'))
const AboutUs = lazy(() => import('@pages/AboutUs'))
const Login = lazy(() => import('@pages/Login'))
const Register = lazy(() => import('@pages/Register'))
const Cart = lazy(() => import('@pages/Cart'))
import Error from '@pages/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense
        fallback={
          <div style={{ marginTop: '10%' }}>
            <LottieHandler type='loading' message='Loading please wait...' />
          </div>
        }>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PageSuspenseFallback>
            <Home />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'cart',
        element: (
          <PageSuspenseFallback>
            <Cart />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <PageSuspenseFallback>
            <Wishlist />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'categories',
        element: (
          <PageSuspenseFallback>
            <Categories />
          </PageSuspenseFallback>
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
          <PageSuspenseFallback>
            <Products />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'about-us',
        element: (
          <PageSuspenseFallback>
            <AboutUs />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'login',
        element: (
          <PageSuspenseFallback>
            <Login />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'register',
        element: (
          <PageSuspenseFallback>
            <Register />
          </PageSuspenseFallback>
        ),
      },
    ],
  },
])
const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
