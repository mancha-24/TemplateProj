import { observer } from 'mobx-react-lite'
import { type Company } from '../../models/company'

interface Props {
  company: Company
}

export default observer(function CompanyDataSection ({ company }: Props) {
  return (
    <div className='grid grid-cols-3 gap-5 p-4 cursor-default'>
        <div className='ml-5 font-poppins col-span-3'>
            <h1 className='font-poppins text-2xl font-bold'>{company.trade}</h1>
        </div>
        <div className='ml-5 font-poppins'>
            <span className='font-poppins text-lg'>RegName: {company.regName}</span>
        </div>
        <div className='ml-5 font-poppins'>
            <h1 className='font-poppins text-lg'>Kvk: {company.kvkNumber}</h1>
        </div>
        <div className='ml-5 font-poppins'>
            <h1 className='font-poppins text-lg'>Director: {company.director}</h1>
        </div>
        <div className='ml-5 font-poppins'>
            <h1 className='font-poppins text-lg'>Address: {company.address}</h1>
        </div>
        <div className='ml-5 font-poppins'>
            <h1 className='font-poppins text-lg'>SVB: {company.svbNumber}</h1>
        </div>
        <div className='ml-5 font-poppins'>
            <h1 className='font-poppins text-lg'>Sector: {company.sector}</h1>
        </div>
    </div>
  )
})
