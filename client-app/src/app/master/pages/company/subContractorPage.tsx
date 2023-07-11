import { observer } from 'mobx-react-lite'
import { useStore } from '../../../stores/store'
import { Fragment, useEffect } from 'react'
import LoadingComponent from '../../components/LoadingComponent'
import HeaderModule from '../common/headerModule'
import { ArrowLongLeftIcon, ChevronUpDownIcon, FaceFrownIcon, PencilIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import CompanyDataSection from './companyDataSection'
import ButtonComponent from '../../components/customInputs/ButtonComponent'
import SpinnerComponent from '../../components/SpinnerComponent'
import { columnsSubContractor } from '../../common/tables/columnsSubContractorTable'
import { IconButton, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import ConfirmationDialog from '../common/ConfirmationDialog'
import SubContractorForm from './forms/subContractorForm'

export default observer(function SubContractorPage () {
  const navigate = useNavigate()
  const { companyStore, modalStore, subContractorFormStore } = useStore()
  const { loadCompany, clearSelectedCompany, loadingScreen: loadingCompany, selectedCompany: company } = companyStore
  const { loadingScreen: loadingSubcontractor, subContractorRegistry, groupedSubContractors, deleteSubContractor } = subContractorFormStore
  useEffect(() => {
    void loadCompany(undefined)
    return () => { clearSelectedCompany() }
  }, [clearSelectedCompany])

  useEffect(() => {
    if (subContractorRegistry.size <= 1) void subContractorFormStore.loadSubContractors()
  }, [subContractorRegistry])

  function HandleDeleteRecord (id: string) {
    modalStore.openModal(<ConfirmationDialog onClick={() => { void deleteSubContractor(id) }} />, 'xs')
  }

  if (loadingCompany || !company) return <LoadingComponent inverted/>
  return (
    <>
        <HeaderModule title='Sub contractor' subtitle='Administration' />
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
                <p className='font-poppins text-2xl font-bold'>Sub Contractor</p>
                <ButtonComponent content='create' buttonAction={() => { modalStore.openModal(<SubContractorForm />) }}/>
            </div>
            <div className='px-16 pt-0 pb-10 grow'>
            {loadingSubcontractor
              ? <SpinnerComponent content='Loading data...' />
              : <table className='mt-4 w-full table-auto text-center shadow-md'>
                    <thead>
                        <tr>
                            {columnsSubContractor.map((column) => (
                            <th key={column.id} className='cursor-pointer bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'>
                                <div className='flex justify-center items-center'>
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
                        {subContractorRegistry.size > 0
                          ? groupedSubContractors.map(([group, records]) => (
                                <Fragment key={group}>
                                { records.map(record => (
                                    <tr key={record.id} className='hover:bg-blue-gray-50 cursor-pointer'>
                                        <td className='p-4 border-b border-blue-gray-50 font-poppins text-center'>
                                            {record.name}
                                        </td>
                                        <td className='p-4 border-b border-blue-gray-50 font-poppins text-center'>
                                            {record.functionName}
                                        </td>
                                        {/* <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                            {record.since}
                                        </td> */}
                                        <td className='p-4 border-b border-blue-gray-50 font-poppins text-center'>
                                            {record.employeesNumber}
                                        </td>
                                        <td className='p-4 border-b border-blue-gray-50 font-poppins text-center'>
                                            {record.needEmployees ? 'Yes' : 'No'}
                                        </td>
                                        <td className='p-4 border-b border-blue-gray-50 font-poppins'>
                                        <Menu placement='left-start'>
                                            <MenuHandler>
                                                <IconButton variant="text" color="blue-gray">
                                                    <PencilSquareIcon className="h-4 w-4" />
                                                </IconButton>
                                            </MenuHandler>
                                            <MenuList className='min-w-[100px]'>
                                                <MenuItem className='flex justify-between' onClick={() => { modalStore.openModal(<SubContractorForm id={record.id} />) }}>
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
        </div>
    </>
  )
})
