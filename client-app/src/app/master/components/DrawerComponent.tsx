import { XMarkIcon } from '@heroicons/react/24/outline'
import { Drawer, IconButton } from '@material-tailwind/react'
import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite'

export default observer(function DrawerComponent () {
  const { drawerStore } = useStore()
  return (
    <>
        <Drawer
            placement='right'
            open={drawerStore.drawer.open}
            onClose={drawerStore.closeDrawer}
            className='p-4 w-96'>
            <div className='mb-6 flex items-center justify-between'>
                <IconButton
                variant='text'
                color='blue-gray'
                onClick={drawerStore.closeDrawer}>
                    <XMarkIcon strokeWidth={2} className='h-5 w-5' />
                </IconButton>
            </div>
            <>
                {drawerStore.drawer.body}
            </>
        </Drawer>
    </>
  )
})
