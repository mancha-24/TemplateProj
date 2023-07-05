import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../stores/store'
import { useEffect, useState } from 'react'
import { ProjectOverviewFormValues } from '../../../models/projectOverview'
import { Form, Formik } from 'formik'
import { projectOverViewValidationSchema } from '../../../common/validations/projectOverviewValidationSchema'
import InputCustom from '../../../components/customInputs/InputCustom'
import ButtonComponent from '../../../components/customInputs/ButtonComponent'

interface Props {
  id?: string
}

export default observer(function ProjectOverviewForm ({ id = '' }: Props) {
  const { projectOverviewFormStore, modalStore } = useStore()
  const [projectOverview, setProjectOverview] = useState<ProjectOverviewFormValues>(new ProjectOverviewFormValues())

  useEffect(() => {
    if (id) {
      void projectOverviewFormStore.loadProjectOverview(id).then(record => {
        setProjectOverview(new ProjectOverviewFormValues(record))
      })
    }
    return () => { projectOverviewFormStore.clearProjectOverviewRegistry() }
  }, [id])

  function handleFormSubmit (record: ProjectOverviewFormValues) {
    if (!record.id) {
      projectOverviewFormStore.createProjectOverview(record)
        .then(() => { modalStore.closeModal() })
        .then(() => { projectOverviewFormStore.clearProjectOverviewRegistry() })
        .catch(() => { })
    } else {
      projectOverviewFormStore.updateProjectOverview(record)
        .then(() => { modalStore.closeModal() })
        .then(() => { projectOverviewFormStore.clearProjectOverviewRegistry() })
        .catch(() => { })
    }
  }

  return (
    <Formik
        onSubmit={async (values) => {
          handleFormSubmit(values)
        }}
      initialValues={projectOverview}
      enableReinitialize
      validationSchema={projectOverViewValidationSchema}>
        {({ handleSubmit, isSubmitting, isValid }) => (
            <Form onSubmit={handleSubmit} autoComplete='off' className='p-8 pt-0'>
                <h2 className='font-poppins font-semibold text-black text-3xl text-left mb-7'>Project Overview</h2>

                <div className='grid grid-cols-3 gap-4 h-full w-full border-2 border-gray-200 rounded-lg shadow-lg p-8 font-poppins'>
                    <div className='w-1 p-4'>
                        <InputCustom name='projectName' variant='standard' type='text' label='Project (naam vermelden)*' />
                    </div>
                    <div className='w-1 p-4'>
                        <InputCustom name='projectLocation' variant='standard' type='text' label='Vestiging project (adres)*' />
                    </div>
                    <div className='w-1 p-4'>
                        <InputCustom name='natureProject' variant='standard' type='text' label='Aard project (zie toelichting)*' />
                    </div>
                    <div className='w-1 p-4'>
                        {/* <DatePickerInput placeholderText='Start Date*'
                            showTimeSelect
                            name='startDate'
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'/> */}
                        <InputCustom name='startDate' variant='standard' type='date' label='Duur: begindatum project*' />
                    </div>
                    <div className='w-1 p-4'>
                        <InputCustom name='endDate' variant='standard' type='date' label='Duur: einddatum project*' />
                    </div>
                    <div className='w-1 p-4'>
                        <InputCustom name='client' variant='standard' type='text' label='Opdrachtgever*' />
                    </div>
                    <div className='w-1 p-4'>
                        <InputCustom name='personnel' variant='standard' type='number' label='Nodig personeel voor dit project*' />
                    </div>
                </div>
                <div className='flex justify-end mt-5'>
                    <ButtonComponent primary disabled={!isValid} buttonAction={() => handleSubmit} isSubmitting={isSubmitting} content={id ? 'Edit' : 'Create'}/>
                </div>
            </Form>
        )}
    </Formik>
  )
})
