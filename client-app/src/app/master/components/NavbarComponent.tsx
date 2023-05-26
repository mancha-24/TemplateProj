import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite'
import { Button, Navbar } from '@material-tailwind/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'

export default observer(function NavBarComponent () {
  const { userStore: { user } } = useStore()
  return (
        <Navbar className='sticky inset-0 z-10 h-20 max-w-full
              rounded-none pb-0 pt-0 px-16
              from-gray-800 to-gray-800'
               color='blue-gray' variant="gradient">
          <div className="flex items-center justify-between text-gray-100 h-20">
            <span className='cursor-pointer origin-left font-medium text-2xl'>Progresa Portal</span>
            <div>
            <Button className="font-medium normal-case text-base flex items-center gap-3 bg-orange-300
                            text-white border-2 border-orange-400 tracking-wider" variant="outlined" ripple
                            onClick={() => { console.log('click...') }}>
             {user?.displayName}
              <UserCircleIcon strokeWidth={2} className="h-6 w-6"/>
            </Button>
            </div>
          </div>
        </Navbar>
  )
})
