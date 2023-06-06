import { observer } from 'mobx-react-lite'
import HeaderModule from '../common/headerModule'
import CompanyDataComponent from './companyDataComponent'
import SimpleCardComponent from '../common/simpleCardComponent'
import { useStore } from '../../../stores/store'
import LaborMarketFormHotel from './forms/laborMarketFormHotel'

export default observer(function CompanyComponent () {
  const { modalStore } = useStore()
  return (
    <>
        <HeaderModule title='Company data' subtitle='Administration' />
        <div className='static m-2 mt-5 bg-white rounded-md shadow-md'>
            <CompanyDataComponent />

            <div className='border-t mt-4'/>

            <p className='p-4 ml-5 mt-4 font-poppins text-2xl font-bold'>Fomularies</p>
            <SimpleCardComponent title='Labor Market Registration Form'
              desc='Current staff (expressed in positions and numbers) and the staffing needs for the year 2023 should be mentioned.'
              buttonText='Edit'
              clickAction={() => { modalStore.openModal(<LaborMarketFormHotel />) }} />

            <div className='border-t mt-4'/>
        </div>
    </>
  )
})
