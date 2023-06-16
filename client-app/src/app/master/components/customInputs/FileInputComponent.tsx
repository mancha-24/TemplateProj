import { useField } from 'formik'
import { Form, Label } from 'semantic-ui-react'

interface Props {
  id: string
  title?: string
  name: string
  type?: string
  label: string
}

export default function FileUploadComponent (props: Props) {
  const [field, meta] = useField(props.name)
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label htmlFor={props.name} className='cursor-pointer font-poppins font-semibold text-xs'>{props.label}</label>
      <input {...field} {...props}
          className={`block h-11 text-base w-full cursor-pointer mt-1
                      rounded-lg border border-solid bg-gray-50
                      p-5 py-[0.32rem] font-normal text-gray-500
                      hover:border-2 hover:border-green-600 font-poppins
                      file:-mx-3
                      file:cursor-pointer
                      file:border-0 file:border-solid file:border-inherit file:bg-gray-50
                      file:py-[0.32rem] file:text-neutral-700
                      file:[margin-inline-end:0.75rem]
          ${meta.touched && meta.error ? 'border-red-400 border-2' : ''}`}/>

          { meta.touched && meta.error
            ? (
                <Label pointing prompt className='font-poppins'>{meta.error}</Label>
              )
            : null }
    </Form.Field>
  )
}
