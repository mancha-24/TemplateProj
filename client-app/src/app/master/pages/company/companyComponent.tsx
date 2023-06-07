import { observer } from 'mobx-react-lite'
import HeaderModule from '../common/headerModule'
import CompanyDataSection from './companyDataSection'
import { useStore } from '../../../stores/store'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import LoadingComponent from '../../components/LoadingComponent'
import CompanyFormsSection from './companyFormsSection'

export default observer(function CompanyComponent () {
  const { companyStore } = useStore()
  const { selectedCompany: company, loadCompany, loadingScreen, clearSelectedCompany } = companyStore
  const { id } = useParams()

  useEffect(() => {
    void loadCompany(id)
    return () => { clearSelectedCompany() }
  }, [id, loadCompany, clearSelectedCompany])

  if (loadingScreen || !company) return <LoadingComponent inverted content='Loading company..'/>

  return (
    <>
        <HeaderModule title='Company data' subtitle='Administration' />
        <div className='static my-5 mx-4 bg-white rounded-md shadow-md'>
            <CompanyDataSection company={company} />
            <div className='border-t mt-4'/>
            <CompanyFormsSection />
            <div className='border-t mt-4'/>

        </div>
    </>
  )
})
