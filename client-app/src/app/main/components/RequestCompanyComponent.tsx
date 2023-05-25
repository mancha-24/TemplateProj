import { observer } from 'mobx-react-lite'
import TextInputCustom from '../../master/components/customInputs/TextInputBasic'
import { Form, Formik } from 'formik'
import { Button } from 'semantic-ui-react'
import * as Yup from 'yup'
import FileUploadComponent from '../../master/components/customInputs/FileInputComponent'
import DropdownComponent from '../../master/components/customInputs/DropdownComponent'
import { sectorOptions } from '../../master/common/options/sectorOptions'
import { Alert, Collapse, Switch } from '@material-tailwind/react'
import { useState } from 'react'
import { CompanyFormValues } from '../../master/models/company'
import { useStore } from '../../stores/store'

export default observer(function RequestCompanyComponent () {
  const { companyStore } = useStore()
  const [company] = useState<CompanyFormValues>(new CompanyFormValues())

  const [isConsultancy, setIsConsultancy] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const consultancyOpen = () => { setIsConsultancy(cur => !cur) }

  const validationSchema = Yup.object({
    trade: Yup.string().required('Handels naam is required'),
    regName: Yup.string().required('Registratie naam is required'),
    kvkNumber: Yup.string().required('# Kvk is required'),
    director: Yup.string().required('Naar directeur is required'),
    address: Yup.string().required('Adres is required'),
    phone: Yup.string().required('Telefoon is required'),
    emailCompany: Yup.string().required('Email is required').email('Incorrect Format'),
    svbNumber: Yup.string().required('# SVB is required'),
    kvkDoc: Yup.string().required('KvK document is required'),
    ownerDoc: Yup.string().required('ID van eigenaar is required'),
    sector: Yup.string().required('Sector is required'),
    email: Yup.string().required('Email is required').email('Incorrect Format'),
    password: Yup.string().required('Password is required').min(3, 'must be at least 3 characters long')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Password must be at least 6 characters long and contain at least one letter and one number')
  })

  return (
    <Formik
    validationSchema={validationSchema}
        onSubmit={async (values) => {
          await companyStore.create(values)
            .then(() => { setSuccess(true) })
            .catch(() => { setError(true) })
        } }
    enableReinitialize
    initialValues={company}
    >
        {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit} autoComplete='off' className='p-8'>
                <h2 className="text-3xl dark:text-black font-semibold text-left">Request company account</h2>
                <Alert open={error}
                        onClose={() => { setError(false) }}
                        animate={{
                          mount: { y: 0 },
                          unmount: { y: 100 }
                        }}
                        color="red"
                        variant="gradient"
                        className='mb-7'>
                    <span>An error occurred while creating the account. Please contact your administrator.</span>
                </Alert>
                <Alert open={success}
                        onClose={() => { setSuccess(false) }}
                        animate={{
                          mount: { y: 0 },
                          unmount: { y: 100 }
                        }}
                        color="green"
                        variant="gradient"
                        className='mb-7'>
                    <span>Your request has been registered. An administrator will review your account and activate it.</span>
                </Alert>
                {/* <AlertComponent color='red'
                                open={error}
                                text='An error occurred while creating the account. Please contact your administrator.'

                                    /> */}
                <div className='grid grid-cols-3 gap-4 h-full w-full'>
                    <TextInputCustom placeholder='Handels naam *' name='trade' type='text'/>
                    <TextInputCustom placeholder='Registratie naam *' name='regName' type='text'/>
                    <TextInputCustom placeholder='KvK # *' name='kvkNumber' type='text'/>
                    <TextInputCustom placeholder='Naar directeur *' name='director' type='text'/>
                    <TextInputCustom placeholder='Adres *' name='address' type='text'/>
                    <TextInputCustom placeholder='Telefoon *' name='phone' type='text'/>
                    <TextInputCustom placeholder='Email *' name='emailCompany' type='text'/>
                    <TextInputCustom placeholder='SVB # *' name='svbNumber' type='text'/>
                    <DropdownComponent options={sectorOptions} placeholder='Sector' name='sector'/>
                    <div className='col-start-1 col-end-2'>
                        <FileUploadComponent name='kvkDoc' type='file' title='kvk'/>
                    </div>
                    <div className='col-start-2 col-end-3'>
                        <FileUploadComponent name='ownerDoc' type='file' title='Id van eigenaar'/>
                    </div>
                    <div className='col-span-3 mt-5 mb-3'>
                        <Switch color="amber" label='Consultancy' id="auto-update" onChange={consultancyOpen}/>
                        <Collapse open={isConsultancy} className='col-start-1 col-end-3'>
                            <div className='grid grid-cols-3 gap-2 h-full w-full'>
                                <TextInputCustom placeholder='Naam' name='nameConsultancy' type='text'/>
                                <TextInputCustom placeholder='Email' name='emailConsultancy' type='text'/>
                                <TextInputCustom placeholder='Telefoon' name='phoneConsultancy' type='text'/>
                                <div className='col-span-1'>
                                    <FileUploadComponent name='authDoc' type='file' title='Machtiging (1 jaar geldig)'/>
                                </div>
                            </div>
                        </Collapse>
                    </div>

                    <h2 className="col-span-3 text-xl dark:text-black font-semibold my-0">Account data</h2>
                    <TextInputCustom placeholder='Email *' name='email' type='text'/>
                    <TextInputCustom placeholder='Password *' name='password' type='password'/>

                    <div className='col-start-1 col-end-2 text-center mt-8'>
                        <Button loading={isSubmitting}
                                content='Send'
                                type="submit" fluid color='orange' style={{ borderRadius: '0.5rem' }}/>
                    </div>
                </div>
            </Form>
        )}
        </Formik>
  )
})
