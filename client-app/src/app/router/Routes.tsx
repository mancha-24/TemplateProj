import { type RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import HomePage from '../master/HomePage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <App /> },
      { path: 'home', element: <HomePage /> }
    ]
  }
]

export const router = createBrowserRouter(routes)
