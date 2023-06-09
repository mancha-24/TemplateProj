import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite'
import { Navbar } from '@material-tailwind/react'
import { UserIcon } from '@heroicons/react/24/outline'
import NotImplementedComponent from '../pages/common/notImplementedComponent'

export default observer(function NavBarComponent () {
  const { userStore: { user }, drawerStore } = useStore()
  return (
        <Navbar className='sticky inset-0 z-10 h-20 max-w-full shadow-transparent
              rounded-none pb-0 pt-0 pr-16
              from-gray-900 to-gray-900'
               color='blue-gray' variant='gradient'>
          <div className="flex items-center justify-between text-gray-100 h-20">
            <span className='m-0 cursor-pointer font-poppins font-bold text-3xl'>Progresa Portal</span>
            <div>

            <button className='flex items-center justify-center rounded-lg h-12 pl-4 pr-2 py-7
                                  text-base bg-gray-900 w-full font-poppins border-2 border-transparent
                                  hover:bg-blue-900 transition duration-500
                                  focus:bg-blue-900 focus:border-white focus:border-2'
                                  onClick={() => { drawerStore.openDrawer(<NotImplementedComponent />) }}>
              <span className='mr-3'>
                \{user?.userName}
              </span>

              <UserIcon strokeWidth={2} className='h-10 w-10 text-white bg-blue-800 p-2 rounded-md' />
            </button>
            </div>
          </div>
        </Navbar>
  )
})
