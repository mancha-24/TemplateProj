import { observer } from 'mobx-react-lite'
import { useStore } from '../../stores/store'
import { Dialog, DialogBody, DialogHeader, IconButton } from '@material-tailwind/react'
import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default observer(function ModalComponent () {
  const { modalStore } = useStore()
  const [open, setOpen] = useState(true)
  const handleOpen = () => { modalStore.closeModal(); setOpen(!open) }
  return (
    <Dialog open={modalStore.modal.open} handler={handleOpen} size={modalStore.modal.size}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 }
      }}
      className='max-h-96 overflow-y-auto'
      style={{ maxHeight: '900px' }}>
        <DialogHeader className='justify-end'>
          <IconButton
              color="blue-gray"
              size="sm"
              variant="text"
              onClick={handleOpen}
            >
              <XMarkIcon strokeWidth={2} className="h-5 w-5" />
            </IconButton>
        </DialogHeader>
        <DialogBody>
          <>
            {modalStore.modal.body}
          </>
        </DialogBody>
    </Dialog>
  )
})
