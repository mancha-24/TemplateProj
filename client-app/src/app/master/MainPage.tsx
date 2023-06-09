import { observer } from 'mobx-react-lite'
import LoadingComponent from './components/LoadingComponent'
import { useStore } from '../stores/store'
import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import NavbarComponent from './components/NavbarComponent'
import MenuComponent from './components/MenuComponent'

export default observer(function MainPage () {
  const location = useLocation()
  const { commonStore, userStore, permissionsStore } = useStore()
  useEffect(() => {
    if (commonStore.token != null) {
      void LoadAppSettings()
    } else {
      commonStore.setAppLoaded()
    }
  }, [])

  async function LoadAppSettings () {
    await userStore.getUser()
    await permissionsStore.getPermissions()
    commonStore.loadMenuItems()
    commonStore.setAppLoaded()
  }

  if (!commonStore.appLoaded) return <LoadingComponent/>
  if (location.pathname === '/') return <Navigate to='/home' state={{ from: location }} />
  return (
        <>
          <NavbarComponent />
          <MenuComponent menuItems={commonStore.menuItems}/>
        </>
  )
})
