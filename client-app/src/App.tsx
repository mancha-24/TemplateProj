import './App.css'
import Login from './app/master/components/Login'
import { ToastContainer } from 'react-toastify'
import { observer } from 'mobx-react-lite'
import { useStore } from './app/stores/store'
import MainPage from './app/master/MainPage'
import ModalComponent from './app/master/components/ModalComponent'
import 'typeface-poppins'

function App () {
  const { commonStore, userStore } = useStore()
  // useEffect(() => {
  //   if (commonStore.token != null) {
  //     void userStore.getUser()
  //   }
  // }, [])

  return (
    <>

      <ToastContainer position='bottom-right' theme='colored' hideProgressBar />
      {!userStore.isLoggedIn && !commonStore.token ? <Login /> : <MainPage/>}
      <ModalComponent />
    </>
  )
}

export default observer(App)
