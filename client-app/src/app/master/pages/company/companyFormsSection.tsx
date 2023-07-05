import { observer } from 'mobx-react-lite'
import SimpleCardComponent from '../common/simpleCardComponent'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../../stores/store'
import { useEffect } from 'react'
import { FaceFrownIcon } from '@heroicons/react/24/outline'

export default observer(function CompanyFormsSection () {
  const { commonStore, companyStore } = useStore()
  const { companyForms, loadCompanyForms } = commonStore
  const { getCompanyForms } = companyStore
  const navigate = useNavigate()

  useEffect(() => {
    void getCompanyForms().then(() => { loadCompanyForms() })
  }, [])

  return (
    <>
        <p className='p-4 mt-5 ml-5 font-poppins text-2xl font-bold text-center'>Company Forms</p>
        <div className='flex justify-center px-16 mb-16'>

            {companyForms.length > 0
              ? companyForms.map((menu, index) => (
                <div key={index}>
                    <SimpleCardComponent title={menu.title}
                        desc={menu.description}
                        buttonAction={() => { navigate(`${menu.action}`) }} />
                </div>
              ))
              : <div className='flex flex-col items-center p-16 px-28 cursor-pointer bg-gray-50
                                rounded-lg hover:bg-gray-100 hover:text-gray-500 duration-200'>
                    <h1 className='font-poppins text-2xl'>No form found for this sector.</h1>
                    <FaceFrownIcon strokeWidth={2} className='h-14 w-14 mt-2' />
                </div>}
        </div>
    </>
  )
})
