import { observer } from 'mobx-react-lite'
import picture from '../../../../public/assets/default-profile-picture.png'
import logo from '../../../../public/assets/plants-sitting.svg'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { useStore } from '../../stores/store'
import ConfirmationDialog from '../pages/common/ConfirmationDialog'

export default observer(function UserCard () {
  const { modalStore, companyStore, userStore } = useStore()
  const { selectedCompany: company } = companyStore
  const { logout } = userStore
  return (
        <div className='container w-full p-4 flex flex-col h-screen justify-between'>
            <div className='flex-col justify-center text-center cursor-default'>
                <img src={picture} className='w-28 h-28 cursor-pointer mb-10 mx-auto block'/>
                <div className='mb-3 text-lg'>
                    {company?.regName}
                </div>
                <div className='mb-3'>
                    {company?.emailCompany}
                </div>
                <div className='mb-5'>
                    Sector: {company?.sector} | SVB: {company?.svbNumber}
                </div>
                <div className='p-2 flex justify-center items-center'>
                    <button onClick={() => {
                      modalStore.openModal(<ConfirmationDialog title='Confirmation Log out'
                                                               onClick={() => { logout() }}
                                                               desc='Are you sure you want to log out? Clicking confirm will end your current session.'
                                                                />
                      , 'xs')
                    }}
                        className='flex items-center p-3 rounded-lg hover:text-blue-gray-200 transition duration-200 font-poppins'>
                        <ArrowLeftOnRectangleIcon strokeWidth={2} className="h-5 w-5 mr-2" />
                        log out
                    </button>
                </div>
            </div>
            <div className='mb-24'>
                <img src={logo} className='object-contain w-full'/>
            </div>
        </div>
  )
})
