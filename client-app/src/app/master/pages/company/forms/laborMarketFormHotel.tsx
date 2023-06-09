import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import * as Yup from 'yup'
import TextInputCustom from '../../../components/customInputs/TextInputBasic'

const formValidationSchema = Yup.object({
  input1: Yup.string().required('This field is required'),
  input2: Yup.string().required('This field is required')
})

export default observer(function LaborMarketFormHotel () {
  return (
        <Formik
        validationSchema={formValidationSchema}
            onSubmit={async (values) => {
              console.log(values)
            } }
        enableReinitialize
        initialValues={{ input1: '', input2: '', error: null }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} autoComplete='off' className='p-8 pt-0'>
                    <h2 className='font-poppins font-semibold text-3xl text-left mb-10'>Labor Market Registration Form</h2>
                    <div className='grid grid-cols-4 gap-4 h-full w-full'>
                        <TextInputCustom placeholder='Handels naam *' name='input1' type='text'/>
                        <TextInputCustom placeholder='Telefoon / mobiel *' name='input2' type='text'/>
                        <TextInputCustom placeholder='Adres *' name='input3' type='text'/>
                        <TextInputCustom placeholder='E-mail adres *' name='input4' type='text'/>
                    </div>
                </Form>
            )}
        </Formik>
  )
})
