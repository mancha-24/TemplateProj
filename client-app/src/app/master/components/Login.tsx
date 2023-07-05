import { ErrorMessage, Field, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { Label } from 'semantic-ui-react'
import { useStore } from '../../stores/store'
import { ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { Checkbox } from '@material-tailwind/react'
import { Ring } from '@uiball/loaders'
import logo from '../../../../public/assets/plants-sitting.svg'
import CreateCompanyComponent from '../pages/company/createCompanyComponent'
import * as Yup from 'yup'

export default observer(function Login () {
  const { userStore, modalStore } = useStore()
  return (
        <div className="grid grid-cols-1 sm:grid-cols-3 h-screen w-full">
            <div className='hidden sm:flex items-center justify-center flex-col bg-gray-900 h-screen'>
                <div className='flex-grow'></div>
                <img src={logo} className='object-contain w-full'/>
            </div>
            <div className='bg-gray-200 flex flex-col justify-center col-span-2'>
                <Formik
                    initialValues={{ email: '', password: '', error: null }}
                    onSubmit={async (values, { setErrors }) => {
                      await userStore.login(values)
                        .catch(() => {
                          setErrors({ error: 'Invalid email or password' })
                        })
                    } }
                    validationSchema={Yup.object({
                      email: Yup.string().required().email('Incorrect Format'),
                      password: Yup.string().required()
                    })}>
                        {({ handleSubmit, isSubmitting, isValid, errors }) => (
                            <Form className='max-w-[450px] w-full mx-auto bg-gray-100 p-10 px-12 rounded-lg shadow-lg' onSubmit={handleSubmit} autoComplete="off">
                                <h2 className='font-poppins text-3xl dark:text-black text-left'>Log in</h2>
                                <ErrorMessage
                                        name='error'
                                        render={() =>
                                        <Label className='font-poppins' style={{ marginBottom: 10 }} basic color='red' content={errors.error}/>
                                        }/>
                                <div className="flex flex-col text-gray-400 py-2 mt-5">
                                    {/* <label>User Name</label> */}
                                    <Field placeholder="Email *" className="text-gray-400 font-poppins font-light rounded-lg
                                            bg-gray-200 mt-2 p-5 focus:border-orange-600
                                            focus:border-2 focus:outline-none focus:bg-gray-100 h-14" name="email" type="text"/>
                                </div>
                                <div className="flex flex-col text-gray-400 py-2">
                                    <Field placeholder="Password *" className="text-gray-400 font-poppins font-light rounded-lg
                                            bg-gray-200 mt-2 p-5 focus:border-orange-600
                                            focus:border-2 focus:outline-none focus:bg-gray-100 h-14" name="password" type="password" />
                                </div>
                                <div className="flex justify-between items-center text-gray-400 py-2">
                                    {/* <p className="flex intems-center"><input className="mr-2" type="checkbox"/> Remember Me</p> */}
                                    <Checkbox label='Remember Me' color='teal' />
                                    <p className='font-poppins'>Forgot Password</p>
                                </div>
                                {/* <Button loading={isSubmitting}
                                        content='Sign In'
                                        type="submit" fluid color='orange' style={{ borderRadius: '0.5rem' }}/> */}

                                <button type='submit' className={`flex items-center justify-center rounded-lg px-6 pb-[6px] pt-2 h-12
                                                                text-base bg-red-500 text-white w-full border-2 font-poppins
                                                                ${!isValid
                                                                ? 'opacity-10 cursor-default'
                                                                : 'hover:bg-opacity-70 hover:border-red-300 hover:border-2 transition duration-300'}
                                                                `}
                                                                disabled={!isValid}>
                                        {!isSubmitting
                                          ? 'Sign In'
                                          : <Ring
                                                size={25}
                                                lineWeight={7}
                                                speed={3}
                                                color="white"/>}

                                </button>

                                <div className='flex items-center justify-between mt-10'>
                                    <p className='mb-0 mr-2 text-gray-500 cursor-default font-poppins'>Is it a company?</p>
                                    <button type='button'
                                        className='flex items-center gap-2 rounded-lg px-6 pb-[6px] pt-2 font-poppins
                                                text-sm font-semibold bg-teal-200 text-white border-2 border-white
                                                transition duration-300
                                                 hover:border-red-500 hover:bg-opacity-10 hover:text-red-500
                                                 active:border-red-500 active:text-red-500'
                                                 onClick={() => { modalStore.openModal(<CreateCompanyComponent />) }}>
                                            Request Account
                                        <ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />
                                    </button>
                                    {/* https://tailwind-elements.com/docs/standard/forms/login-form/ */}
                                </div>
                            </Form>
                        )}
                </Formik>
            </div>
        </div>
  )
})
