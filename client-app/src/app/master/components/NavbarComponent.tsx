import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite'
import { Navbar } from '@material-tailwind/react'
import { UserIcon } from '@heroicons/react/24/outline'

export default observer(function NavBarComponent () {
  const { userStore: { user } } = useStore()
  return (
        <Navbar className='sticky inset-0 z-10 h-20 max-w-full shadow-transparent
              rounded-none pb-0 pt-0 px-16
              from-blue-700 to-blue-700'
               color='blue-gray' variant='gradient'>
          <div className="flex items-center justify-between text-gray-100 h-20">
            <span className='cursor-pointer origin-left font-poppins font-medium text-2xl'>Progresa Portal</span>
            <div>

            <button className='flex items-center justify-center rounded-lg h-12 pl-4 pr-2 py-7
                                  text-base bg-blue-700 w-full font-poppins
                                  hover:bg-blue-900 hover:border-white transition duration-500'
                                  onClick={() => { console.log('click...') }}>
              <span className='mr-3'>
                \{user?.displayName}
              </span>

              <UserIcon strokeWidth={2} className='h-10 w-10 text-white bg-blue-800 p-2 rounded-md' />
            </button>
            </div>
          </div>
        </Navbar>
  )
})
