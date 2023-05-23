import { ErrorMessage, Field, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { Button, Label } from 'semantic-ui-react'
import { useStore } from '../../stores/store'
import loginImg from '../../../assets/dpl_main.jpg'
import { Card } from '@material-tailwind/react'
export default observer(function Login () {
  const { userStore } = useStore()
  return (
        <div className="grid grid-cols-1 sm:grid-cols-3 h-screen w-full">
            <div className="hidden sm:block">
                <img className='w-full h-full' src={loginImg} alt='' />
            </div>
            <div className="bg-gray-100 flex flex-col justify-center col-span-2">
                <Formik
                    initialValues={{ email: '', password: '', error: null }}
                    onSubmit={async (values, { setErrors }) => {
                      await userStore.login(values)
                        .catch(() => {
                          setErrors({ error: 'Invalid email or password' })
                        })
                    } }>
                        {({ handleSubmit, isSubmitting, errors }) => (
                            <Form className="max-w-[400px] w-full mx-auto bg-gray-100 p-8 px-8 rounded-lg" onSubmit={handleSubmit} autoComplete="off">
                                <h2 className="text-3xl dark:text-black font-semibold text-left">Log In</h2>
                                <ErrorMessage
                                        name='error'
                                        render={() =>
                                        <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error}/>
                                        }/>
                                <div className="flex flex-col text-gray-400 py-2 mt-5">
                                    {/* <label>User Name</label> */}
                                    <Field placeholder="Email *" className="text-gray-400 font-light rounded-lg bg-light-gray mt-2 p-5 focus:border-orange-600 focus:outline-none h-14" name="email" type="text"/>
                                </div>
                                <div className="flex flex-col text-gray-400 py-2">
                                    <label>Password</label>
                                    <Field placeholder="Password *" className="text-gray-400 font-light rounded-lg bg-light-gray mt-2 p-5 focus:border-orange-600 focus:outline-none h-14" name="password" type="password" />
                                </div>
                                <div className="flex justify-between text-gray-400 py-2">
                                    <p className="flex intems-center"><input className="mr-2" type="checkbox"/> Remember Me</p>
                                    <p>Forgot Password</p>
                                </div>
                                <Button loading={isSubmitting}
                                        content='Sign In'
                                        type="submit" fluid color='orange' style={{ borderRadius: '0.5rem' }}/>
                                {/* <button type='submit' className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
                                    Sign In
                                </button> */}
                                <div className='flex items-center justify-between mt-10'>
                                    <p className='mb-0 mr-2 text-gray-400'>Are you a Company?</p>
                                    <button type='button' className='inline-block rounded border-2 px-6 pb-[6px] pt-2
                                                text-xs font-medium uppercase bg-light-gray text-gray-400
                                                transition duration-150 ease-in-out
                                                 hover:border-orange-600 hover:bg-opacity-10 hover:text-orange-600
                                                 focus:border-orange-600 focus:text-orange-600 focus:bg-opacity-10 focus:outline-none focus:ring-0
                                                 active:border-orange-600 active:text-orange-600'
                                        data-te-ripple-init
                                        data-te-ripple-color='light'>
                                        Request User
                                        {/* https://tailwind-elements.com/docs/standard/forms/login-form/ */}
                                    </button>
                                </div>
                            </Form>
                        )}
                </Formik>
            </div>
        </div>
  )
})
