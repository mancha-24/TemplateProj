import { observer } from 'mobx-react-lite'
import LoadingComponent from './components/LoadingComponent'
import { useStore } from '../stores/store'
import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import NavbarComponent from './components/NavbarComponent'
import MenuComponent from './components/MenuComponent'

export default observer(function MainPage () {
  const location = useLocation()
  const { commonStore, userStore } = useStore()
  useEffect(() => {
    if (commonStore.token != null) {
      userStore.getUser().finally(() => { commonStore.setAppLoaded() })
    } else {
      commonStore.setAppLoaded()
    }
  }, [])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading Progresa'/>
  if (location.pathname === '/') return <Navigate to='/home' state={{ from: location }} />
  return (
        <>
          <NavbarComponent />
          <MenuComponent />
        </>
  )
})
