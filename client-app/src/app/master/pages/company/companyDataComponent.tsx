import { observer } from 'mobx-react-lite'

export default observer(function CompanyDataComponent () {
  return (
    <div className='grid grid-cols-3 gap-5 p-4'>
        <div className='ml-5 font-poppins col-span-3'>
            <h1 className='font-poppins text-2xl font-bold'>Titanium Corp</h1>
        </div>
        <div className='ml-5 font-poppins'>
            <span className='font-poppins text-lg'>Titan</span>
        </div>
        <div className='ml-5 font-poppins'>
            <h1 className='font-poppins text-lg'>Kvk: 123456</h1>
        </div>
        <div className='ml-5 font-poppins'>
            <h1 className='font-poppins text-lg'>Director: Manuel Chavez</h1>
        </div>
        <div className='ml-5 font-poppins'>
            <h1 className='font-poppins text-lg'>Address: Medellin</h1>
        </div>
        <div className='ml-5 font-poppins'>
            <h1 className='font-poppins text-lg'>SVB 123123</h1>
        </div>
        <div className='ml-5 font-poppins'>
            <h1 className='font-poppins text-lg'>Sector: hotel</h1>
        </div>
    </div>
  )
})
