import { observer } from 'mobx-react-lite'
import HeaderModule from '../common/headerModule'
import CompanyDataComponent from './companyDataComponent'
import SimpleCardComponent from '../common/simpleCardComponent'
import { useStore } from '../../../stores/store'
import LaborMarketFormHotel from './forms/laborMarketFormHotel'
import NotImplementedComponent from '../common/notImplementedComponent'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import LoadingComponent from '../../components/LoadingComponent'

export default observer(function CompanyComponent () {
  const { modalStore, companyStore } = useStore()
  const { selectedCompany: company, loadCompany, loadingScreen, clearSelectedCompany } = companyStore
  const { id } = useParams()

  useEffect(() => {
    if (id) void loadCompany(id)

    void loadCompany('0be8fd79-6626-4945-7c3d-08db66c7faaa')

    return () => { clearSelectedCompany() }
  }, [id, loadCompany, clearSelectedCompany])

  if (loadingScreen || !company) return <LoadingComponent inverted />

  return (
    <>
        <HeaderModule title='Company data' subtitle='Administration' />
        <div className='static my-5 mx-4 bg-white rounded-md shadow-md'>
            <CompanyDataComponent />

            <div className='border-t mt-4'/>

            <p className='p-4 ml-5 font-poppins text-2xl font-bold'>Fomularies</p>
            <div className='flex justify-between px-16'>
                <SimpleCardComponent title='Labor Market Registration Form' isPending
                  desc='Current staff (expressed in positions and numbers) and the staffing needs for the year 2023 should be mentioned.'
                  buttonAction={() => { modalStore.openModal(<LaborMarketFormHotel />) }} />

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
            <div className='border-t mt-4'/>
        </div>
    </>
  )
})
