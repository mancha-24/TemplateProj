import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import ButtonComponent from '../../../components/customInputs/ButtonComponent'
import { useStore } from '../../../../stores/store'
import AutoComplete from '../../../components/customInputs/AutoComplete'
import { LaborMarketFormValues } from '../../../models/laborMarket'
import { laborMarketValidationSchema } from '../../../common/validations/laborMarketValidationSchema'
import InputCustom from '../../../components/customInputs/InputCustom'

interface Props {
  id?: string
}

export default observer(function LaborMarketFormHotel ({ id = '' }: Props) {
  const { masterDataStore, laborMarketFormsStore, modalStore } = useStore()
  const { functionToDropDown } = masterDataStore
  const [laborMarket, setLaborMarket] = useState<LaborMarketFormValues>(new LaborMarketFormValues())
  useEffect(() => {
    if (id) void laborMarketFormsStore.loadMarketRecord(id).then(record => { setLaborMarket(new LaborMarketFormValues(record)) })
    void masterDataStore.loadFunctionsDropdown()
    return () => { laborMarketFormsStore.clearLaborMarketRecordsRegistry() }
  }, [])

  function handleFormSubmit (record: LaborMarketFormValues) {
    const functSelected = functionToDropDown.find(item => item.text === record.functionName)
    if (functSelected) {
      record.functionId = functSelected?.value
      if (!record.id) {
        laborMarketFormsStore.createLaborMarket(record)
          .then(() => { modalStore.closeModal() })
          .then(() => { laborMarketFormsStore.clearLaborMarketRecordsRegistry() })
          .catch(() => { })
      } else {
        laborMarketFormsStore.updateLaborMarket(record)
          .then(() => { modalStore.closeModal() })
          .then(() => { laborMarketFormsStore.clearLaborMarketRecordsRegistry() })
          .catch(() => { })
      }

      // todo: validate function id exists
    }
  }
  return (
        <Formik
            onSubmit={async (values) => {
              handleFormSubmit(values)
            }}
            initialValues={laborMarket}
            enableReinitialize
            validationSchema={laborMarketValidationSchema}
        >
            {({ handleSubmit, isSubmitting, isValid }) => (
                <Form onSubmit={handleSubmit} autoComplete='off' className='p-8 pt-0'>
                    <h2 className='font-poppins font-semibold text-black text-3xl text-left mb-7'>Labor Market Registration </h2>
                    <span className='col-span-4 font-poppins text-black text-xl my-1 p-8'>Functies </span>
                    <div className='w-96 p-8 font-poppins shadow-sm mb-2'>
                        <AutoComplete items={functionToDropDown} name='functionName' label='*Function' type='text' />
                    </div>
                    <div className='grid grid-cols-4 gap-4 h-full w-full border-2 border-gray-200 rounded-lg shadow-lg p-8 font-poppins'>
                      <span className='col-span-4 font-poppins text-black text-xl mb-2'>Niet-Toelatingsplichtig</span>
                      <div className='w-1'>
                        <InputCustom name='subAquantity' variant='standard' type='number' max={5} label='Sub A' />
                      </div>
                      <div className='w-1'>
                        <InputCustom name='subBquantity' variant='standard' type='number' max={5} label='Sub B' />
                      </div>
                      <div className='w-1'>
                        <InputCustom name='subCquantity' variant='standard' type='number' max={5} label='Sub C' />
                      </div>
                      <div className='w-1'>
                        <InputCustom name='subDquantity' variant='standard' type='number' max={5} label='Sub D' />
                      </div>

                      <div className='w-1 mt-5'>
                        <InputCustom name='autoAdmissionQuantity' variant='standard' type='number' max={5} label='Toelating van rechtswege' />
                      </div>
                    </div>
                    <div className='mt-4 grid grid-cols-4 gap-4 h-full w-full border-2 border-gray-200 rounded-lg shadow-lg p-8 font-poppins'>
                      <span className='col-span-4 font-poppins text-black text-xl mb-2'>Toelatingsplichtig</span>
                      <div className='w-1'>
                        <InputCustom name='vtvQuantity' variant='standard' type='number' max={5} label='VTV' />
                      </div>
                      <div className='w-1'>
                        <InputCustom name='vvQuantity' variant='standard' type='number' max={5} label='VV' />
                      </div>
                    </div>
                    <div className='mt-4 grid grid-cols-4 gap-4 h-full w-full border-2 border-gray-200 rounded-lg shadow-lg p-8 font-poppins'>
                      <span className='col-span-4 font-poppins text-black text-xl mb-2'>Voor Huidig en Toekomstige Personeel 2023</span>
                      <div className='w-1'>
                        <InputCustom name='training' variant='standard' type='text' label='*Opleiding' />
                      </div>
                      <div className='w-1'>
                        <InputCustom name='salaryMonth' variant='standard' type='number' label='*Bruto salaris per maand' step='any'/>
                      </div>
                      <div className='w-1'>
                        <InputCustom name='daysWeek' variant='standard' type='number' label='*Arbeids dagen per week' step='any'/>
                      </div>
                      <div className='w-1'>
                        <InputCustom name='hoursWeek' variant='standard' type='number' label='*Arbeids uren per week' step='any'/>
                      </div>
                    </div>
                    <div className='flex justify-end mt-8'>
                        <ButtonComponent primary disabled={!isValid} buttonAction={() => handleSubmit} isSubmitting={isSubmitting} content={id ? 'Edit' : 'Create'}/>
                    </div>
                </Form>
            )}
        </Formik>
  )
})
