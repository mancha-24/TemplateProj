import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../stores/store'
import { useEffect, useState } from 'react'
import { SubContractorFormValues } from '../../../models/subContractor'
import { Form, Formik } from 'formik'
import { subContractorValidationSchema } from '../../../common/validations/subContractorValidationSchema'
import AutoComplete from '../../../components/customInputs/AutoComplete'
import InputCustom from '../../../components/customInputs/InputCustom'
import ButtonComponent from '../../../components/customInputs/ButtonComponent'

interface Props {
  id?: string
}

export default observer(function SubContractorForm ({ id = '' }: Props) {
  const { masterDataStore, subContractorFormStore, modalStore } = useStore()
  const { functionToDropDown } = masterDataStore
  const [subContractor, setSubContractor] = useState<SubContractorFormValues>(new SubContractorFormValues())

  useEffect(() => {
    if (id) void subContractorFormStore.loadSubContractor(id).then(record => { setSubContractor(new SubContractorFormValues(record)) })
    void masterDataStore.loadFunctionsCompanyDropdown()
    return () => { subContractorFormStore.clearSubContractorRegistry() }
  }, [])

  function handleFormSubmit (record: SubContractorFormValues) {
    const functSelected = functionToDropDown.find(item => item.text === record.functionName)
    if (functSelected) {
      record.functionId = functSelected?.value
      if (!record.id) {
        subContractorFormStore.createSubContractor(record)
          .then(() => { modalStore.closeModal() })
          .then(() => { subContractorFormStore.clearSubContractorRegistry() })
          .catch(() => { })
      } else {
        subContractorFormStore.updateSubContractor(record)
          .then(() => { modalStore.closeModal() })
          .then(() => { subContractorFormStore.clearSubContractorRegistry() })
          .catch(() => { })
      }
    }
  }
  return (
        <Formik
          onSubmit={async (values) => {
            handleFormSubmit(values)
          }}
          initialValues={subContractor}
          enableReinitialize
          validationSchema={subContractorValidationSchema}>
            {({ handleSubmit, isSubmitting, isValid }) => (
              <Form onSubmit={handleSubmit} autoComplete='off' className='p-8 pt-0'>
                <h2 className='font-poppins font-semibold text-black text-3xl text-left mb-7'>Sub contractors</h2>

                <span className='col-span-4 font-poppins text-black text-xl my-1 p-8'>Functies </span>
                <div className='w-96 p-8 font-poppins shadow-sm mb-2'>
                    <AutoComplete items={functionToDropDown} name='functionName' label='Function*' type='text' />
                </div>
                <div className='grid grid-cols-3 gap-4 h-full w-full border-2 border-gray-200 rounded-lg shadow-lg p-8 font-poppins'>
                  <div className='w-1'>
                    <InputCustom name='name' variant='standard' type='text' max={5} label='Name of subcontractors*' />
                  </div>
                  <div className='w-1'>
                    <InputCustom name='since' variant='standard' type='text' max={5} label='Contract since*' />
                  </div>
                  <div className='w-1'>
                    <InputCustom name='employeesNumber' variant='standard' type='number' label='Number of employees*' />
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
