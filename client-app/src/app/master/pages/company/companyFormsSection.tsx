import { observer } from 'mobx-react-lite'
import SimpleCardComponent from '../common/simpleCardComponent'
import { useStore } from '../../../stores/store'
import NotImplementedComponent from '../common/notImplementedComponent'
import { useNavigate } from 'react-router-dom'

export default observer(function CompanyFormsSection () {
  const { modalStore } = useStore()
  const navigate = useNavigate()
  return (
    <>
        <p className='p-4 ml-5 font-poppins text-2xl font-bold'>Fomularies</p>
        <div className='flex justify-between px-16'>
            <SimpleCardComponent title='Labor Market Registration Form' isPending
                desc='Current staff (expressed in positions and numbers) and the staffing needs for the year 2023 should be mentioned.'
                buttonAction={() => { navigate('/laborMarket') }} />

            <SimpleCardComponent title='Project Overview Form' isPending
                desc='This form should be used to provide an overview of ongoing projects.'
                buttonAction={() => { modalStore.openModal(<NotImplementedComponent />, 'sm') }} />

            <SimpleCardComponent title='Copy of Building Permit' isPending
                desc='This form should be used to provide an overview of ongoing projects and to provide a copy of the building permit.'
                buttonAction={() => { modalStore.openModal(<NotImplementedComponent />, 'sm') }} />

            <SimpleCardComponent title='Personnel Overview / Staffing Needs Form'
                desc='This form should be used to provide an overview of the current personnel (expressed in job roles and quantities) and the staffing needs for the year 2023.'
                buttonAction={() => { modalStore.openModal(<NotImplementedComponent />, 'sm') }} />
        </div>
    </>
  )
})
