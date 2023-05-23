import { observer } from 'mobx-react-lite'
import TextInputCustom from '../../master/components/customInputs/TextInputBasic'
import { Form, Formik } from 'formik'
import { Button } from 'semantic-ui-react'

export default observer(function RequestCompanyComponent () {
  return (
    <Formik
    initialValues={{ trade: '', tradeb: '', tradec: '', error: null }}
    onSubmit={async (values, { setErrors }) => {
      console.log(values)
      // .catch(() => {
      //   setErrors({ error: 'Invalid email or password' })
      // })
    } }>
        {({ handleSubmit, isSubmitting, errors }) => (
            <Form onSubmit={handleSubmit} autoComplete="off">
                <h2 className="text-3xl dark:text-black font-semibold text-left">Request Account</h2>
                <div className='grid grid-cols-3 gap-4 h-full w-full'>
                    <div>
                        <TextInputCustom placeholder='Handels naam *' name='trade'
                            type='text'
                        />
                    </div>
                    <div>
                        <TextInputCustom placeholder='Handels naam *' name='tradeb'
                            type='text'
                        />
                    </div>
                    <div>
                        <TextInputCustom placeholder='Handels naam *' name='tradec'
                            type='text'
                        />
                    </div>
                    <div className='col-span-1'>
                        <Button loading={isSubmitting}
                                content='Send'
                                type="submit" fluid color='orange' style={{ borderRadius: '0.5rem' }}/>
                    </div>
                </div>
            </Form>
        )}
        {/* <div className='grid grid-cols-3 gap-4 h-full w-full'>
            <div>
                <input placeholder='Handels naam *'
                        className='text-gray-500 font-light rounded-lg bg-gray-50 mt-2 p-5 focus:border-orange-600 focus:border-2 focus:outline-none h-11'
                        name='trade'
                        type='text' />

            </div>
            <div>
                <TextInputCustom placeholder='Handels naam *' name='trade'
                    type='text'
                />

            </div>
        </div> */}

        </Formik>
  )
})
