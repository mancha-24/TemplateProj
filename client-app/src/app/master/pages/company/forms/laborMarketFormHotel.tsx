import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import ButtonComponent from '../../../components/customInputs/ButtonComponent'
import { useStore } from '../../../../stores/store'
import AutoComplete from '../../../components/customInputs/AutoComplete'
import { LaborMarketFormValues } from '../../../models/laborMarket'
import { laborMarketValidationSchema } from '../../../common/validations/laborMarketValidationSchema'
import InputCustom from '../../../components/customInputs/InputCustom'
import { timeWorkOptions } from '../../../common/options/timeWorkOptions'
import SelectComponent from '../../../components/customInputs/SelectComponent'
import { getDayAndHourBySelection } from '../../../common/utilities'
import { opleidingOptions } from '../../../common/options/opleidingOptions'
import TooltipComponent from '../../../components/customInputs/TooltipComponent'
import { Chip } from '@material-tailwind/react'

interface Props {
  id?: string
}

export default observer(function LaborMarketFormHotel ({ id = '' }: Props) {
  const { masterDataStore, laborMarketFormsStore, modalStore } = useStore()
  const { functionToDropDown } = masterDataStore
  const [laborMarket, setLaborMarket] = useState<LaborMarketFormValues>(new LaborMarketFormValues())
  const [timeDetailValue, setTimeDetailValue] = useState('')
  const [timeDetailFutureValue, setTimeDetailFutureValue] = useState('')
  const [funtionValue, setFuntionValue] = useState('')
  const [salaryValue, setSalaryValue] = useState(1893.40)
  const [salaryFutureValue, setSalaryFutureValue] = useState(1893.40)
  useEffect(() => {
    if (id) {
      void laborMarketFormsStore.loadMarketRecord(id).then(record => {
        setLaborMarket(new LaborMarketFormValues(record))
        setTimeDetailValue(record!.timeDetail)
        setTimeDetailFutureValue(record!.timeDetailFuture)
      })
    }
    void masterDataStore.loadFunctionsDropdown()
    return () => { laborMarketFormsStore.clearLaborMarketRecordsRegistry() }
  }, [])

  function handleTimeDetailChangeAction (value: string) {
    setTimeDetailValue(value)
  }

  function handleTimeDetailFutureChangeAction (value: string) {
    setTimeDetailFutureValue(value)
  }

  function handleFunctionChangeAction (value: string) {
    setFuntionValue(value)
  }

  function handleSalaryChangeAction (value: number) {
    setSalaryValue(value)
  }

  function handleSalaryFutureChangeAction (value: number) {
    setSalaryFutureValue(value)
  }

  function handleFormSubmit (record: LaborMarketFormValues) {
    if (record.timeDetail !== '0') {
      const result = getDayAndHourBySelection(record.timeDetail)
      record.daysWeek = result.days!
      record.hoursWeek = result.hours!
    }
    if (record.timeDetailFuture !== '0') {
      const result = getDayAndHourBySelection(record.timeDetailFuture)
      record.daysWeekFuture = result.days!
      record.hoursWeekFuture = result.hours!
    }
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
                        <AutoComplete items={functionToDropDown} name='functionName' label='*Functies' type='text' onChange={handleFunctionChangeAction}/>
                    </div>
                    <div className='grid grid-cols-4 gap-4 h-full w-full border-2 border-gray-200 rounded-lg shadow-lg p-8 font-poppins'>
                      <span className='col-span-4 font-poppins text-black text-xl mb-2'>Niet-Toelatingsplichtig</span>
                      <div className='w-1'>
                        <InputCustom name='subAquantity' variant='standard' type='number' max={5} label='Sub A' />
                        <TooltipComponent title='Sub A' desc='Nederlanders, als zodanig in Aruba geboren;'/>
                      </div>
                      <div className='w-1'>
                        <InputCustom name='subBquantity' variant='standard' type='number' max={5} label='Sub B' />
                        <TooltipComponent title='Sub B' desc='Personen die in Aruba de Nederlandse nationaliteit hebben verkregen;'/>
                      </div>
                      <div className='w-1'>
                        <InputCustom name='subCquantity' variant='standard' type='number' max={5} label='Sub C' />
                        <TooltipComponent title='Sub C' desc='Nederlanders, als zodanig buiten Aruba geboren, en die gedurende een periode van ten minste tien jaar toelating en hoofdverblijf in Aruba hebben of hebben gehad;'/>
                      </div>
                      <div className='w-1'>
                        <InputCustom name='subDquantity' variant='standard' type='number' max={5} label='Sub D' />
                        <TooltipComponent title='Sub D' desc='Nederlanders, als zodanig buiten Aruba geboren, van wie ten minste een van de ouders behoort of, overleden zijnde, vóór dat overlijden, behoorde tot de personen, bedoeld in de onderdelen a, b of c.'/>
                      </div>

                      <div className='w-1 mt-5'>
                        <InputCustom name='autoAdmissionQuantity' variant='standard' type='number' max={5} label='Toelating van rechtswege' />
                        <TooltipComponent title='Van rechtswege toegelaten tot verblijf in Aruba (artikel 3):' desc='a. Personen die in overheidsdienst zijn dan wel in dienst van een van de landen van het Koninkrijk of een internationale organisatie en in Aruba zijn gestationeerd; b. Personen die in dienst zijn geweest van Aruba of vóór 1 januari 1986 in dienst waren van de Nederlandse Antillen of het eilandgebied Aruba en uit dien hoofde pensioen of uitkering bij wijze van pensioen genieten, alsmede de niet hertrouwde weduwen van zodanige personen; c. In Aruba als zodanig toegelaten beroepsconsuls, beroeps-consulaire ambtenaren en ander consulair personeel; d. Militairen of civiele personeelsleden, in dienst van een ander land, gedurende de tijd dat zij in Aruba gestationeerd zijn, of op grond van een verdrag toelating in Aruba hebben; e. Opvarenden van tot de zee- of luchtmacht van enige mogendheid behorende schepen of luchtvaartuigen, gedurende de tijd, dat Aruba met toestemming van de bevoegde autoriteit wordt aangedaan; f. Nederlanders die gedurende langer dan vijf jaar in Aruba zijn toegelaten geweest van rechtswege of krachtens vergunning; g. Personen die gedurende ten minste vijf jaar gehuwd zijn met en inwonen bij een persoon als bedoeld in artikel 1, eerste lid, of een persoon als bedoeld in dit artikel, eerste lid, onderdeel a tot en met f, en gedurende een periode van ten minste vijf jaar toelating en hoofdverblijf in Aruba hebben of hebben gehad, alsmede de uit dat huwelijk geboren of staande dat huwelijk geadopteerde of erkende minderjarige inwonende kinderen; h. Personen, in Aruba geboren, die de Nederlandse nationaliteit niet bezitten, mits zij de leeftijd van tien jaar hebben bereikt, en sedert hun geboorte in Aruba zijn toegelaten geweest. '/>
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
                      <span className='col-span-4 font-poppins text-black text-xl mb-2'>HUIDIG PERSONEEL 2023</span>
                      <div className='w-1'>
                        <SelectComponent options={opleidingOptions} name='training' label='*Opleiding'/>
                      </div>
                      <div className='w-1'>
                        {
                          funtionValue === 'Directeur'
                            ? <>
                                <input
                                title='Bruto salaris per maand'
                                disabled
                                value='N.V.T'
                                className='p-3 rounded-md cursor-not-allowed text-center font-poppins'/>
                                <input name='salaryMonth' hidden type='number' value={1}/>
                              </>
                            : <>
                            <InputCustom name='salaryMonth' variant='standard' type='number' label='*Bruto salaris per maand' step='any' onChange={handleSalaryChangeAction}/>
                              {
                                salaryValue < 1893.40 &&
                                // <label className='w-full absolute'>Part Time</label>
                                <Chip variant='ghost' color='amber' size='sm' value='Part Time' className='absolute w-24 normal-case font-poppins text-sm mt-2'
                                                    icon={<span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-orange-600" />} />
                              }
                            </>
                        }
                      </div>
                      <div className='w-1'>
                        <InputCustom name='needCount' variant='standard' type='number' label='*Aantal behoefte' step='any'/>
                      </div>
                      <div className='w-1 col-start-1 mt-4'>
                        <SelectComponent options={timeWorkOptions} name='timeDetail' label='*Arbeidstijd' onChange={handleTimeDetailChangeAction}/>
                      </div>
                      {
                        timeDetailValue === '0' &&
                          <>
                            <div className='w-1 mt-4'>
                              <InputCustom name='daysWeek' variant='standard' type='number' label='Arbeid Dagen' step='any'/>
                            </div>
                            <div className='w-1 mt-4'>
                              <InputCustom name='hoursWeek' variant='standard' type='number' label='Arbeid Uren' step='any'/>
                            </div>
                          </>
                      }
                    </div>
                    <div className='mt-4 grid grid-cols-4 gap-4 h-full w-full border-2 border-gray-200 rounded-lg shadow-lg p-8 font-poppins'>
                      <span className='col-span-4 font-poppins text-black text-xl mb-2'>Toekomstige  PERSONEEL 2023</span>
                      <div className='w-1'>
                        <SelectComponent options={opleidingOptions} name='trainingFuture' label='*Opleiding'/>
                      </div>
                      <div className='w-1'>
                        {
                          funtionValue === 'Directeur'
                            ? <>
                              <input
                                title='Bruto salaris per maand'
                                disabled
                                value='N.V.T'
                                className='p-3 rounded-md cursor-not-allowed text-center font-poppins'/>
                              <input hidden name='salaryMonthFuture' type='number'/>
                            </>
                            : <>
                              <InputCustom name='salaryMonthFuture' variant='standard' type='number' label='*Bruto salaris per maand' step='any' onChange={handleSalaryFutureChangeAction}/>
                              {
                                salaryFutureValue < 1893.40 &&
                                // <label className='w-full absolute'>Part Time</label>
                                <Chip variant='ghost' color='amber' size='sm' value='Part Time' className='absolute w-24 normal-case font-poppins text-sm mt-2'
                                                    icon={<span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-orange-600" />} />
                              }
                            </>

                        }
                      </div>
                      <div className='w-1'>
                        <InputCustom name='needCountFuture' variant='standard' type='number' label='*Aantal behoefte' step='any'/>
                      </div>
                      <div className='w-1 col-start-1 mt-4'>
                        <SelectComponent options={timeWorkOptions} name='timeDetailFuture' label='*Arbeidstijd' onChange={handleTimeDetailFutureChangeAction}/>
                      </div>
                      {
                        timeDetailFutureValue === '0' &&
                          <>
                            <div className='w-1 mt-4'>
                              <InputCustom name='daysWeekFuture' variant='standard' type='number' label='Arbeid Dagen' step='any'/>
                            </div>
                            <div className='w-1 mt-4'>
                              <InputCustom name='hoursWeekFuture' variant='standard' type='number' label='Arbeid Uren' step='any'/>
                            </div>
                          </>
                      }
                    </div>
                    <div className='flex justify-end mt-8'>
                        <ButtonComponent primary disabled={!isValid} buttonAction={() => handleSubmit} isSubmitting={isSubmitting} content={id ? 'Edit' : 'Create'}/>
                    </div>
                </Form>
            )}
        </Formik>
  )
})
