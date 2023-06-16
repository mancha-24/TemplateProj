import './App.css'
import Login from './app/master/components/Login'
import { ToastContainer } from 'react-toastify'
import { observer } from 'mobx-react-lite'
import { useStore } from './app/stores/store'
import MainPage from './app/master/MainPage'
import ModalComponent from './app/master/components/ModalComponent'
import 'typeface-poppins'
import DrawerComponent from './app/master/components/DrawerComponent'

function App () {
  const { commonStore, userStore } = useStore()
  return (
    <>

      <ToastContainer position='bottom-right' theme='colored' hideProgressBar />
      {!userStore.isLoggedIn && !commonStore.token ? <Login /> : <MainPage/>}
      <ModalComponent />
      <DrawerComponent />
    </>
  )
}

export default observer(App)
