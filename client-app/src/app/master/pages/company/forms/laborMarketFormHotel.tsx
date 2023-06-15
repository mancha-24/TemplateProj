import { Input } from '@material-tailwind/react'
import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import ButtonComponent from '../../../components/customInputs/ButtonComponent'
import { useStore } from '../../../../stores/store'
import * as Yup from 'yup'
import AutoComplete from '../../../components/customInputs/AutoComplete'

export default observer(function LaborMarketFormHotel () {
  const { masterDataStore } = useStore()
  const { functions } = masterDataStore
  const [functionList, setFunctionList] = useState<string[]>([])
  useEffect(() => {
    void masterDataStore.loadFunctionsDropdown()
    setFunctionList(functions.map((f) => f.name))
  }, [functions])

  return (
        <Formik
            onSubmit={async (values) => {
              console.log(values)
            } }
            initialValues={{ function: '' }}
            enableReinitialize
            validationSchema={Yup.object({
              function: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, isValid }) => (
                <Form onSubmit={handleSubmit} autoComplete='off' className='p-8 pt-0'>
                    <h2 className='font-poppins font-semibold text-black text-3xl text-left mb-7'>Labor Market Registration </h2>
                    <span className='col-span-4 font-poppins text-black text-xl my-1 p-8'>Functies </span>
                    <div className='w-96 p-8 font-poppins shadow-sm mb-2'>
                        <AutoComplete items={functionList} name='function' label='Function' type='text' />
                    </div>
                    <div className='grid grid-cols-4 gap-4 h-full w-full border-2 border-gray-200 rounded-lg shadow-lg p-8 font-poppins'>
                      <span className='col-span-4 font-poppins text-black text-xl mb-2'>Niet-Toelatingsplichtig</span>
                      <div className='w-1'>
                        <Input label='Sub A' variant='standard' type='number' max={5} min={0} style={{ fontFamily: 'Poppins, sans-serif' }} />
                      </div>
                      <div className='w-1'>
                        <Input label='Sub B' variant='standard' type='number' max={5} min={0} />
                      </div>
                      <div className='w-1'>
                        <Input label='Sub C' variant='standard' type='number' max={5} min={0} />
                      </div>
                      <div className='w-1'>
                        <Input label='Sub D' variant='standard' type='number' max={5} min={0} />
                      </div>

                      <div className='w-1 mt-5'>
                        <Input label='Toelating van rechtswege' variant='standard' type='number' max={5} min={0} />
                      </div>
                    </div>
                    <div className='mt-4 grid grid-cols-4 gap-4 h-full w-full border-2 border-gray-200 rounded-lg shadow-lg p-8 font-poppins'>
                      <span className='col-span-4 font-poppins text-black text-xl mb-2'>Toelatingsplichtig</span>
                      <div className='w-1'>
                        <Input label='VTV' variant='standard' type='number' max={5} min={0} />
                      </div>
                      <div className='w-1'>
                        <Input label='VV' variant='standard' type='number' max={5} min={0} />
                      </div>
                    </div>
                    <div className='mt-4 grid grid-cols-4 gap-4 h-full w-full border-2 border-gray-200 rounded-lg shadow-lg p-8 font-poppins'>
                      <span className='col-span-4 font-poppins text-black text-xl mb-2'>Voor Huidig en Toekomstige Personeel 2023</span>
                      <div className='w-1'>
                        <Input label='Opleiding' variant='standard' type='text' style={{ fontFamily: 'Poppins, sans-serif' }}/>
                      </div>
                      <div className='w-1'>
                        <Input label='Bruto salaris per maand' variant='standard' type='number' min={0} />
                      </div>
                      <div className='w-1'>
                        <Input label='Arbeids dagen per week' variant='standard' type='number' min={0} />
                      </div>
                      <div className='w-1'>
                        <Input label='Arbeids uren per week' variant='standard' type='number' min={0} />
                      </div>
                    </div>
                    <div className='flex justify-end mt-8'>
                        <ButtonComponent primary disabled={!isValid} buttonAction={() => handleSubmit} isSubmitting={isSubmitting}/>
                    </div>
                </Form>
            )}
        </Formik>
  )
})
