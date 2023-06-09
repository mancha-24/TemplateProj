import { observer } from 'mobx-react-lite'

import HeaderModule from '../common/headerModule'
import { ChevronUpDownIcon, FaceFrownIcon, PencilIcon } from '@heroicons/react/24/outline'
import { useStore } from '../../../stores/store'
import { Fragment, useEffect } from 'react'
import { Chip, IconButton, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { format } from 'date-fns'
import { DotSpinner } from '@uiball/loaders'
import PaginationComponent from '../../components/table/PaginationComponent'
import NotImplementedComponent from '../common/notImplementedComponent'

export default observer(function CompanyAdminComponent () {
  const { companyStore, drawerStore, modalStore } = useStore()
  const { companyRegistry, loadCompanies, groupedCompanies, loadingScreen } = companyStore

  useEffect(() => {
    if (companyRegistry.size <= 1) void companyStore.loadCompanies()
  }, [loadCompanies])

  return (
    <>
        <HeaderModule title='Company administration' subtitle='Administration' />
        <div className='static my-5 mx-4 bg-white rounded-md shadow-sm'>

            <p className='p-4 ml-5 font-poppins text-2xl font-bold'>Company dashboard</p>

            <div className='px-16 pt-0 pb-10 grow'>
                {loadingScreen
                  ? <div className='flex flex-col items-center mt-8'>
                        <DotSpinner size={60} speed={0.9} color='black'/>
                        <span className='font-poppins mt-4'>Loading companies...</span>
                    </div>

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
                            <th className='cursor-pointer bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'>
                                <div className='flex justify-normal items-center'>
                                    <span className='mr-3 font-poppins'>
                                        Registration Name
                                    </span>
                                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                </div>
                            </th>
                            <th className='cursor-pointer bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'>
                                <div className='flex justify-normal items-center'>
                                    <span className='mr-3 font-poppins'>
                                        KVK Number
                                    </span>
                                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                </div>
                            </th>
                            <th className='cursor-pointer bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'>
                                <div className='flex justify-normal items-center'>
                                    <span className='mr-3 font-poppins'>
                                        Director
                                    </span>
                                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                </div>
                            </th>
                            <th className='cursor-pointer bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'>
                                <div className='flex justify-center items-center'>
                                    <span className='mr-3 font-poppins'>
                                        Status
                                    </span>
                                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                </div>
                            </th>
                            <th className='cursor-default bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'>
                                <span className='mr-3 font-poppins'>
                                    Actions
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {companyRegistry.size > 0
                          ? groupedCompanies.map(([group, companies]) => (
                            <Fragment key={group}>
                            {
                                companies.map(company => (
                                    <tr key={company.id} className='hover:bg-blue-gray-50 cursor-pointer'>
                                        <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                            {company.id}
                                        </td>
                                        <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                            {format(company.creationDate!, 'yyyy-MM-dd')}
                                        </td>
                                        <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                            {company.trade}
                                        </td>
                                        <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                            {company.regName}
                                        </td>
                                        <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                            {company.kvkNumber}
                                        </td>
                                        <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                            {company.director}
                                        </td>
                                        <td className='p-4 border-b border-blue-gray-50 font-poppins'>
                                            <div className='flex justify-center font-poppins lowercase'>
                                                {company.isActive
                                                  ? <Chip variant='ghost' color='green' size='sm' value='Active' className='w-20 normal-case font-poppins text-sm'
                                                    icon={<span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-green-900" />} />
                                                  : <Chip variant='ghost' color='red' size='sm' value='Inactive' className='w-24 normal-case font-poppins text-sm'
                                                    icon={<span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-red-900" />} />}
                                            </div>
                                        </td>
                                        <td className='p-4 border-b border-blue-gray-50 font-poppins'>
                                            <Menu placement='left-start'>
                                                <MenuHandler>
                                                    <IconButton variant="text" color="blue-gray">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </MenuHandler>
                                                <MenuList className='min-w-[120px]'>
                                                    <MenuItem className='flex justify-center' onClick={() => { drawerStore.openDrawer(<NotImplementedComponent />) }}>
                                                        <span className='font-poppins text-black'>Manage</span>
                                                    </MenuItem>
                                                    {!company.isActive &&
                                                    <MenuItem className='flex justify-center' onClick={() => { modalStore.openModal(<NotImplementedComponent />, 'xs') }}>
                                                        <span className='font-poppins text-black'>Activate</span>
                                                    </MenuItem>}
                                                </MenuList>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))
                            }
                        </Fragment>))
                          : <tr className='hover:bg-blue-gray-50'>
                                <td className='cursor-pointer p-4 border-b border-blue-gray-50 font-poppins text-center' colSpan={6}>
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
                </table>}
            </div>

            {!loadingScreen &&
                <div className='shadow-lg flex justify-center p-8 pt-4'>
                    <PaginationComponent />
                </div>
            }

        </div>
    </>
  )
})
