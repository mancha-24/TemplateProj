import { observer } from 'mobx-react-lite'
import TextInputCustom from '../../components/customInputs/TextInputBasic'
import { Form, Formik } from 'formik'
import FileUploadComponent from '../../components/customInputs/FileInputComponent'
import DropdownComponent from '../../components/customInputs/DropdownComponent'
import { sectorOptions } from '../../common/options/sectorOptions'
import { Alert } from '@material-tailwind/react'
import { useState } from 'react'
import { CompanyFormValues } from '../../models/company'
import { useStore } from '../../../stores/store'
import { Ring } from '@uiball/loaders'
import { companyValidationSchema } from '../../common/validations/companyValidationSchema'

export default observer(function CreateCompanyComponent () {
  const { companyStore } = useStore()
  const [company] = useState<CompanyFormValues>(new CompanyFormValues())

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  return (
    <Formik
    validationSchema={companyValidationSchema}
        onSubmit={async (values) => {
          await companyStore.create(values)
            .then(() => { setSuccess(true) })
            .catch(() => { setError(true) })
        } }
    enableReinitialize
    initialValues={company}
    >
        {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit} autoComplete='off' className='p-8 pt-0'>
                <h2 className='font-poppins font-semibold text-3xl text-left'>Request company account</h2>
                <Alert open={error}
                        onClose={() => { setError(false) }}
                        animate={{
                          mount: { y: 0 },
                          unmount: { y: 100 }
                        }}
                        color="red"
                        variant="gradient"
                        className='mb-7 font-poppins'>
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
                        className='mb-7 font-poppins'>
                    <span>Your request has been registered. An administrator will review your account and activate it.</span>
                </Alert>
                {/* <AlertComponent color='red'
                                open={error}
                                text='An error occurred while creating the account. Please contact your administrator.'

                                    /> */}
                <div className='grid grid-cols-4 gap-4 h-full w-full'>

                    <TextInputCustom placeholder='Handels naam *' name='trade' type='text'/>
                    <TextInputCustom placeholder='Registratie naam *' name='regName' type='text'/>
                    <TextInputCustom placeholder='KvK # *' name='kvkNumber' type='text'/>
                    <TextInputCustom placeholder='Naar directeur *' name='director' type='text'/>
                    <TextInputCustom placeholder='Adres *' name='address' type='text'/>
                    <TextInputCustom placeholder='Telefoon *' name='phone' type='text'/>
                    <TextInputCustom placeholder='Email *' name='emailCompany' type='text'/>
                    <TextInputCustom placeholder='SVB # *' name='svbNumber' type='text'/>

                    <DropdownComponent options={sectorOptions} placeholder='Sector' name='sectorId'/>
                    <div className='col-start-1 col-end-2'>
                        <FileUploadComponent name='kvkDoc' id='kvkDoc' type='file' label='KvK document'/>
                    </div>

                    <FileUploadComponent name='ownerDoc' id='ownerDoc' type='file' label='Id van eigenaar'/>
                    <FileUploadComponent name='validExtractCoC' id='validExtractCoC' type='file' label='Valid extract Chamber of Commerce'/>

                    <FileUploadComponent name='copyOfMinisterialPermitDEZHI' id='copyOfMinisterialPermitDEZHI' type='file' label='Ministerial Decree or Establishment Permit DEZHI'/>
                    <FileUploadComponent name='copyOfDirectorPermit' id='copyOfDirectorPermit' type='file' label='Copy of Director/Executive Permit'/>
                    <FileUploadComponent name='copyOfResidencePermitDirector' id='copyOfResidencePermitDirector' type='file' label='Copy of Residence Permit for Director'/>

                    <FileUploadComponent name='copyOfIDDirector' id='copyOfIDDirector' type='file' label='Copy of ID (Director)'/>
                    <FileUploadComponent name='copyOfValidContractsProjects' id='copyOfValidContractsProjects' type='file' label='Copy of valid contracts and/or projects'/>

                    {/* <div className='col-span-3 mt-5 mb-3 font-poppins'>
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
                    </div> */}

                    <h2 className='col-span-3 text-xl mt-5 font-poppins font-semibold'>Account data</h2>
                    <div className='col-start-1 col-end-2'>
                        <TextInputCustom placeholder='Email *' name='email' type='text'/>
                    </div>
                    <div className='col-start-2 col-end-3'>
                        <TextInputCustom placeholder='Password *' name='password' type='password'/>
                    </div>

                    <div className='col-start-1 col-end-2 text-center mt-8'>
                        <button type='submit' className='flex items-center justify-center rounded-lg px-6 pb-[6px] pt-2 h-12
                                                                text-base bg-red-500 text-white w-full border-2 font-poppins
                                                                hover:bg-opacity-70 hover:border-red-300 hover:border-2 transition duration-300'>
                            {!isSubmitting
                              ? 'Send'
                              : <Ring
                                    size={25}
                                    lineWeight={7}
                                    speed={3}
                                    color="white"/>}
                        </button>
                    </div>
                </div>
            </Form>
        )}
        </Formik>
  )
})
