import { observer } from 'mobx-react-lite'
import SimpleCardComponent from '../common/simpleCardComponent'
import { useNavigate } from 'react-router-dom'

export default observer(function CompanyFormsSection () {
  const navigate = useNavigate()
  return (
    <>
        <p className='p-4 mt-5 ml-5 font-poppins text-2xl font-bold text-center'>Fomularies</p>
        <div className='flex justify-center px-16 mb-16'>
            <SimpleCardComponent title='Personnel Overview / Staffing Needs Form'
                desc='This form should be used to provide an overview of the current personnel (expressed in job roles and quantities) and the staffing needs for the year 2023.'
                buttonAction={() => { navigate('/laborMarket') }} />

            <SimpleCardComponent title='Project Overview Form' isPending
                desc='This form should be used to provide an overview of ongoing projects.'
                buttonAction={() => { navigate('/projectOverview') }} />

            {/* <SimpleCardComponent title='Copy of Building Permit' isPending
                desc='This form should be used to provide an overview of ongoing projects and to provide a copy of the building permit.'
                buttonAction={() => { modalStore.openModal(<NotImplementedComponent />, 'sm') }} /> */}

            {/* <SimpleCardComponent title='Personnel Overview / Staffing Needs Form'
                desc='This form should be used to provide an overview of the current personnel (expressed in job roles and quantities) and the staffing needs for the year 2023.'
                buttonAction={() => { modalStore.openModal(<NotImplementedComponent />, 'sm') }} /> */}
        </div>
    </>
  )
})
