import { observer } from 'mobx-react-lite'
import HeaderModule from '../common/headerModule'
import CompanyDataSection from './companyDataSection'
import { useStore } from '../../../stores/store'
import { Fragment, useEffect } from 'react'
import LoadingComponent from '../../components/LoadingComponent'
import { useNavigate } from 'react-router-dom'
import { ArrowLongLeftIcon, ChevronUpDownIcon, FaceFrownIcon, PencilIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import SpinnerComponent from '../../components/SpinnerComponent'
import PaginationComponent from '../../components/table/PaginationComponent'
import LaborMarketFormHotel from './forms/laborMarketFormHotel'
import ButtonComponent from '../../components/customInputs/ButtonComponent'
import { columnsLaborMarket } from '../../common/tables/columnsLaborMarketTable'
import { IconButton, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import ConfirmationDialog from '../common/ConfirmationDialog'

export default observer(function LaborMarketPage () {
  const { companyStore, modalStore, laborMarketFormsStore } = useStore()
  const navigate = useNavigate()
  const { selectedCompany: company, loadCompany, loadingScreen: loadingCompany, clearSelectedCompany } = companyStore
  const { laborMarketRecordsRegistry, groupedLaborMarketRecords, loadingScreen: loadingMarket, deleteLaborMarket } = laborMarketFormsStore
  useEffect(() => {
    void loadCompany(undefined)
    return () => { clearSelectedCompany() }
  }, [clearSelectedCompany])

  useEffect(() => {
    if (laborMarketRecordsRegistry.size <= 1) void laborMarketFormsStore.loadMarketRecords()
  }, [laborMarketRecordsRegistry])

  function HandleDeleteRecord (id: string) {
    modalStore.openModal(<ConfirmationDialog onClick={() => { void deleteLaborMarket(id) }} />, 'xs')
  }

  if (loadingCompany || !company) return <LoadingComponent inverted/>
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

                <div className='flex justify-between px-16 pt-6 pb-2'>
                    <p className='font-poppins text-2xl font-bold'>Market data</p>
                    <ButtonComponent content='create' buttonAction={() => { modalStore.openModal(<LaborMarketFormHotel />) }}/>
                </div>
                <div className='px-16 pt-0 pb-10 grow'>
                    {loadingMarket
                      ? <SpinnerComponent content='Loading data...' />
                      : <table className='mt-4 w-full table-auto text-center shadow-md'>
                            <thead>
                                <tr>
                                    {columnsLaborMarket.map((column) => (
                                        <th key={column.id} className='cursor-pointer bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'>
                                            <div className='flex justify-normal items-center'>
                                                <span className='mr-3 font-poppins'>
                                                    {column.text}
                                                </span>
                                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                            </div>
                                        </th>
                                    ))}
                                    <th className='cursor-default bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 font-poppins'>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {laborMarketRecordsRegistry.size > 0
                              ? groupedLaborMarketRecords.map(([group, records]) => (
                                    <Fragment key={group}>
                                    { records.map(record => (
                                        <tr key={record.id} className='hover:bg-blue-gray-50 cursor-pointer'>
                                            <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                                {record.functionName}
                                            </td>
                                            <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                                {record.training}
                                            </td>
                                            <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                                {record.salaryMonth}
                                            </td>
                                            <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                                {record.daysWeek}
                                            </td>
                                            <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                                {record.hoursWeek}
                                            </td>
                                            <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                                {record.quantity}
                                            </td>
                                            <td className='p-4 border-b border-blue-gray-50 font-poppins'>
                                            <Menu placement='left-start'>
                                                <MenuHandler>
                                                    <IconButton variant="text" color="blue-gray">
                                                        <PencilSquareIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </MenuHandler>
                                                <MenuList className='min-w-[100px]'>
                                                    <MenuItem className='flex justify-between' onClick={() => { modalStore.openModal(<LaborMarketFormHotel id={record.id} />) }}>
                                                        <span className='font-poppins text-black mr-2'>Edit</span>
                                                        <PencilIcon className="h-4 w-4" />
                                                    </MenuItem>
                                                    <MenuItem className='flex justify-between' onClick={() => { HandleDeleteRecord(record.id) }}>
                                                        <span className='font-poppins text-black mr-2'>Delete</span>
                                                        <TrashIcon className="h-5 w-5" />
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </td>
                                        </tr>
                                    ))
                                    }
                                    </Fragment>
                              ))
                              : <tr className='hover:bg-blue-gray-50'>
                                    <td className='cursor-pointer p-4 border-b border-blue-gray-50 font-poppins text-center' colSpan={7}>
                                        <div className='flex flex-col items-center'>
                                            <span className='font-poppins'>
                                                No data found
                                            </span>
                                            <FaceFrownIcon strokeWidth={2} className='h-8 w-8 mt-2' />
                                        </div>
                                    </td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    }
                </div>
                {!loadingMarket && laborMarketRecordsRegistry.size > 0 &&
                    <div className='flex justify-center p-8 pt-4'>
                        <PaginationComponent />
                    </div>
                }
                <div className='border-t mt-4'/>
                {laborMarketRecordsRegistry.size > 0 &&
                <div className='px-16 pt-6 pb-2 mb-4'>
                    <p className='font-poppins text-2xl font-bold'>Total staff:</p>
                    <div className='grid grid-cols-7 gap-4 rounded-lg justify-center items-center hover:bg-gray-100 duration-100 cursor-pointer p-4'>
                        {Array.from(laborMarketFormsStore.laborMarketRecordTotals).map(([key, value]) => (
                            <div key={key}>
                                <p className='font-poppins text-base font-bold text-center'>{key}</p>
                                <p className='font-poppins text-base font-bold text-center'>{value}</p>
                            </div>
                        ))}
                    </div>
                </div>}
            </div>
        </>
  )
})
