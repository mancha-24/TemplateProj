import { observer } from 'mobx-react-lite'
import LoadingComponent from '../components/LoadingComponent'

export default observer(function HomePage () {
  return <LoadingComponent inverted/>
  // return (
  //   <>
  //     hola home page
  //   </>
  // )
})
