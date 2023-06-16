import { type RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import Login from '../master/components/Login'
import RequireAuth from './RequireAuth'
import HomePage from '../master/pages/HomePage'
import MainPage from '../master/MainPage'
import CompanyAdminComponent from '../master/pages/company/companyAdminComponent'
import CompanyComponent from '../master/pages/company/companyComponent'
import LaborMarketPage from '../master/pages/company/laborMarketPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: 'main', element: <MainPage /> },
          { path: 'home', element: <HomePage /> },
          { path: 'companyAdmin', element: <CompanyAdminComponent /> },
          { path: 'company', element: <CompanyComponent /> },
          { path: 'laborMarket', element: <LaborMarketPage /> }
        ]
      },
      { path: 'login', element: <Login /> }
    ]
  }
]

export const router = createBrowserRouter(routes)
