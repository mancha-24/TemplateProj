import { observer } from 'mobx-react-lite'
import HeaderModule from '../common/headerModule'
import { ChevronUpDownIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Typography } from '@material-tailwind/react'

export default observer(function CompanyComponent () {
  // return <LoadingComponent content='Loading company users' inverted/>
  return (
    <>
        <HeaderModule title='Company administration' subtitle='Administration' />
        <div className='static m-2 mt-5 bg-white rounded-md'>
            <div className='flex justify-between p-4'>
                <div className='ml-5 text-xl'>Company Users</div>
                <div className='ml-5 order-last'>
                    <button className='flex items-center gap-3 px-6 py-3 normal-case text-sm font-semibold
                    text-white bg-green-400 rounded-lg border-2
                    transition duration-150 ease-in-out
                    hover:border-green-400 hover:border-2 hover:bg-opacity-50 hover:text-green-400'>
                        <PlusIcon strokeWidth={2} className='h-5 w-5'/>
                        New Company User
                    </button>
                </div>
            </div>
            <div className='flex p-4'>
                <div className='grow p-4 pr-0'>
                    <input type='text' className='w-full p-3 pl-5 rounded-lg border-2 border-green-400
                            focus:outline-none focus:border-green-400' placeholder='Company name...'/>
                </div>
                <div className='flex-none p-4 pl-0'>
                    <button className='flex items-center p-3 bg-green-400 rounded-lg border-2 text-white
                    hover:border-green-400 hover:border-2 hover:bg-opacity-50 hover:text-green-400'>
                        <MagnifyingGlassIcon strokeWidth={2} className='h-5 w-6'/>
                    </button>
                </div>
            </div>

            <div className='flex p-4'>
                <div className='grow p-4'>
                    <table className='mt-4 w-full table-auto text-left'>
                        <thead>
                            <tr>
                                <th className='cursor-pointer bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                    Nombre
                                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                </Typography>
                                </th>
                                <th className='cursor-pointer bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                        Razon Social
                                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                    </Typography>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='p-4 border-b border-blue-gray-50'>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        EMPRESA N° 1 DE PRUEBA
                                    </Typography>
                                </td>
                                <td className='p-4 border-b border-blue-gray-50'>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        RAZON SOCIAL DE EMPRESA N° 1 DE PRUEBA
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td className='p-4 border-b border-blue-gray-50'>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        EMPRESA N° 1 DE PRUEBA
                                    </Typography>
                                </td>
                                <td className='p-4 border-b border-blue-gray-50'>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        RAZON SOCIAL DE EMPRESA N° 1 DE PRUEBA
                                    </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
  )
})
