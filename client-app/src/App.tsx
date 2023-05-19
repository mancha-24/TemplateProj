import './App.css'
import Login from './app/master/components/Login'
import { ToastContainer } from 'react-toastify'
import { observer } from 'mobx-react-lite'
import { useStore } from './app/stores/store'
import MainPage from './app/master/MainPage'

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
    </>
  )
}

export default observer(App)
