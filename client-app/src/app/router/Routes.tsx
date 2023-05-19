import { type RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import Login from '../master/components/Login'
import RequireAuth from './RequireAuth'
import HomePage from '../master/pages/HomePage'
import MainPage from '../master/MainPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: 'main', element: <MainPage /> },
          { path: 'home', element: <HomePage /> }
        ]
      },
      { path: 'login', element: <Login /> }
    //   { path: 'login', element: <App /> },
    //   { path: 'home', element: <HomePage /> }
    ]
  }
]

export const router = createBrowserRouter(routes)
