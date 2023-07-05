import { FaceFrownIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import ButtonComponent from '../../components/customInputs/ButtonComponent'
import { useStore } from '../../../stores/store'

interface Props {
  onClick: () => void
  title?: string
  desc?: string
}

export default observer(function ConfirmationDialog ({
  onClick,
  title = 'Confirmation Delete',
  desc = 'Are you sure you want to delete this record? This action cannot be undone.'
}: Props) {
  const { modalStore } = useStore()
  function HandleConfirm () {
    onClick()
    modalStore.closeModal()
  }
  return (
    <>
        <div className='p-8 pt-0'>
            <h2 className='font-poppins font-semibold text-red-300 text-3xl text-left mb-7'>
                {title}
            </h2>
            <div className='flex flex-col mt-4 font-poppins text-black text-sm'>
                {desc}
                <FaceFrownIcon strokeWidth={2} className='self-center h-14 w-14' />
            </div>
            <div className='border-t mt-4'/>
            <div className='flex justify-end mt-4 items-center'>
                <div className='p-4'>
                    <button onClick={() => { modalStore.closeModal() }}
                        className='flex items-center p-3 rounded-lg hover:text-blue-gray-200 transition duration-200 font-poppins'>
                        Cancel
                    </button>
                </div>
                <ButtonComponent buttonAction={HandleConfirm} content='Confirm' primary/>
            </div>
        </div>
    </>
  )
})
