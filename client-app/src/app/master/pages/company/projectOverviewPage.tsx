import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import LoadingComponent from '../../components/LoadingComponent'
import { useStore } from '../../../stores/store'
import { Fragment, useEffect } from 'react'
import HeaderModule from '../common/headerModule'
import { ArrowLongLeftIcon, ChevronUpDownIcon, FaceFrownIcon, PencilIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import CompanyDataSection from './companyDataSection'
import ButtonComponent from '../../components/customInputs/ButtonComponent'
import SpinnerComponent from '../../components/SpinnerComponent'
import { columnsProjectOverview } from '../../common/tables/columnsProjectOverviewTable'
import { IconButton, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { format } from 'date-fns'
import ProjectOverviewForm from './forms/projectOverviewForm'
import ConfirmationDialog from '../common/ConfirmationDialog'

export default observer(function ProjectOverviewPage () {
  const navigate = useNavigate()
  const { companyStore, modalStore, projectOverviewFormStore } = useStore()
  const { loadCompany, clearSelectedCompany, loadingScreen: loadingCompany, selectedCompany: company } = companyStore
  const { loadingScreen: loadingProject, projectOverviewRegistry, groupedProjectOverviews, deleteProjectOverview } = projectOverviewFormStore
  useEffect(() => {
    void loadCompany(undefined)
    return () => { clearSelectedCompany() }
  }, [clearSelectedCompany])

  useEffect(() => {
    if (projectOverviewRegistry.size <= 1) void projectOverviewFormStore.loadProjectOverviews()
  }, [projectOverviewRegistry])

  function HandleDeleteRecord (id: string) {
    modalStore.openModal(<ConfirmationDialog onClick={() => { void deleteProjectOverview(id) }} />, 'xs')
  }

  if (loadingCompany || !company) return <LoadingComponent inverted/>
  return (
    <>
        <HeaderModule title='Project Overview' subtitle='Administration' />
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
                <p className='font-poppins text-2xl font-bold'>Project Overview</p>
                <ButtonComponent content='create' buttonAction={() => { modalStore.openModal(<ProjectOverviewForm />) }}/>
            </div>
            <div className='px-16 pt-0 pb-10 grow'>
            {loadingProject
              ? <SpinnerComponent content='Loading data...' />
              : <table className='mt-4 w-full table-auto text-center shadow-md'>
                  <thead>
                    <tr>
                      {columnsProjectOverview.map((column) => (
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
                    {projectOverviewRegistry.size > 0
                      ? groupedProjectOverviews.map(([group, records]) => (
                        <Fragment key={group}>
                        { records.map(record => (
                            <tr key={record.id} className='hover:bg-blue-gray-50 cursor-pointer'>
                                <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                    {record.projectName}
                                </td>
                                <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                    {record.projectLocation}
                                </td>
                                <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                    {record.natureProject}
                                </td>
                                <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                    {format(record.startDate!, 'dd MMM yyyy h:mm aa')}
                                </td>
                                <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                    {format(record.endDate!, 'dd MMM yyyy h:mm aa')}
                                </td>
                                <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                    {record.client}
                                </td>
                                <td className='p-4 border-b border-blue-gray-50 font-poppins text-left'>
                                    {record.personnel}
                                </td>
                                <td className='p-4 border-b border-blue-gray-50 font-poppins'>
                                <Menu placement='left-start'>
                                    <MenuHandler>
                                        <IconButton variant="text" color="blue-gray">
                                            <PencilSquareIcon className="h-4 w-4" />
                                        </IconButton>
                                    </MenuHandler>
                                    <MenuList className='min-w-[100px]'>
                                        <MenuItem className='flex justify-between' onClick={() => { modalStore.openModal(<ProjectOverviewForm id={record.id} />) }}>
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
                          <td className='cursor-pointer p-4 border-b border-blue-gray-50 font-poppins text-center' colSpan={8}>
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
