import { useField } from 'formik'
import { Form, Label } from 'semantic-ui-react'

interface Props {
  placeholder?: string
  name: string
  label?: string
  type?: string
}

export default function TextInputCustom (props: Props) {
  const [field, meta] = useField(props.name)
  return (
        <Form.Field error={meta.touched && !!meta.error}>
            <input {...field} {...props} className={`text-gray-500 font-light font-poppins
                    rounded-lg bg-gray-50 mt-2 p-5 focus:border-blue-600 focus:border-2 w-full
                    focus:outline-none h-11 ${meta.touched && meta.error ? 'border-red-400 border-2' : ''}`}/>
            { meta.touched && meta.error
              ? (
                <Label pointing prompt className='font-poppins'>{meta.error} </Label>
                )
              : null }
        </Form.Field>
  )
}
