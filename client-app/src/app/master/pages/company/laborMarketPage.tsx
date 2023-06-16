import { observer } from 'mobx-react-lite'
import HeaderModule from '../common/headerModule'
import CompanyDataSection from './companyDataSection'
import { useStore } from '../../../stores/store'
import { useEffect } from 'react'
import LoadingComponent from '../../components/LoadingComponent'
import { useNavigate } from 'react-router-dom'
import { ArrowLongLeftIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import SpinnerComponent from '../../components/SpinnerComponent'
import PaginationComponent from '../../components/table/PaginationComponent'
import LaborMarketFormHotel from './forms/laborMarketFormHotel'
import ButtonComponent from '../../components/customInputs/ButtonComponent'

export default observer(function LaborMarketPage () {
  const { companyStore } = useStore()
  const navigate = useNavigate()
  const { modalStore } = useStore()
  const { selectedCompany: company, loadCompany, loadingScreen, clearSelectedCompany } = companyStore
  useEffect(() => {
    void loadCompany(undefined)
    return () => { clearSelectedCompany() }
  }, [clearSelectedCompany])

  if (loadingScreen || !company) return <LoadingComponent inverted/>
  return (
        <>
            <HeaderModule title='Labora market data' subtitle='Administration' />
            <div className='static my-5 mx-4 bg-white rounded-md overflow-y-auto scroll-smooth shadow-sm'
                 style={{ maxHeight: '760px', height: '760px' }}>
                <div className='p-4'>
                    <button onClick={() => { navigate('/company') }}
                        className='flex items-center p-3 rounded-lg hover:text-blue-gray-200 transition duration-200 font-poppins'>
                        <ArrowLongLeftIcon strokeWidth={2} className="h-5 w-5 mr-2" />
                        Back
                    </button>
                </div>
                <CompanyDataSection company={company} />
                <div className='border-t mt-4'/>

                <p className='p-4 pb-2 ml-5 font-poppins text-2xl font-bold'>Market data</p>
                <div className='flex justify-end px-16 pt-0 pb-2'>
                    <ButtonComponent content='create' buttonAction={() => { modalStore.openModal(<LaborMarketFormHotel />) }}/>
                </div>
                <div className='px-16 pt-0 pb-10 grow'>
                    {loadingScreen
                      ? <SpinnerComponent content='Loading data...' />
                      : <table className='mt-4 w-full table-auto text-center shadow-md'>
                            <thead>
                                <tr>
                                    <th className='cursor-pointer bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'>
                                        <div className='flex justify-normal items-center'>
                                            <span className='mr-3 font-poppins'>
                                                Company ID
                                            </span>
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        </div>
                                    </th>
                                    <th className='cursor-pointer bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'>
                                        <div className='flex justify-normal items-center'>
                                            <span className='mr-3 font-poppins'>
                                                Creation Date
                                            </span>
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        </div>
                                    </th>
                                    <th className='cursor-pointer bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'>
                                        <div className='flex justify-normal items-center'>
                                            <span className='mr-3 font-poppins'>
                                                Trade
                                            </span>
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='hover:bg-blue-gray-50 cursor-pointer'>
                                    <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>prueba</td>
                                    <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>prueba</td>
                                    <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>prueba</td>
                                </tr>
                                <tr className='hover:bg-blue-gray-50 cursor-pointer'>
                                    <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>prueba</td>
                                    <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>prueba</td>
                                    <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>prueba</td>
                                </tr>
                                <tr className='hover:bg-blue-gray-50 cursor-pointer'>
                                    <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>prueba</td>
                                    <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>prueba</td>
                                    <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>prueba</td>
                                </tr>
                            </tbody>
                        </table>
                    }
                </div>
                {!loadingScreen &&
                    <div className='flex justify-center p-8 pt-4'>
                        <PaginationComponent />
                    </div>
                }
                <div className='border-t mt-4'/>
            </div>
        </>
  )
})
