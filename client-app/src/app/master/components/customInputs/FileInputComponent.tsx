import { CloudArrowUpIcon } from '@heroicons/react/20/solid'
import { useField } from 'formik'
import { useRef } from 'react'
import { Form, Label } from 'semantic-ui-react'

interface Props {
  title: string
  name: string
  label?: string
  type?: string
}

export default function FileUploadComponent (props: Props) {
  const [field, meta] = useField(props.name)
  const inputRef = useRef()
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }
  return (
    <Form.Field error={meta.touched && !!meta.error}>
        <div onClick={handleClick} className={`flex mt-3 items-center justify-center p-4 h-11 cursor-pointer rounded-lg hover:border-2 hover:border-gray-600 ${meta.touched && meta.error ? 'border-red-400 border-2' : ''}`}>
            <label htmlFor={props.name} className="mr-4 cursor-pointer">{props.title}</label>
                <CloudArrowUpIcon strokeWidth={2} className="h-7 w-7" onClick={handleClick}/>
                <input {...field} {...props} id={props.name} className={`text-gray-500 font-light 
                        rounded-lg bg-gray-50 mt-2 p-5 focus:border-green-600 focus:border-2 
                        focus:outline-none h-11 ${meta.touched && meta.error ? 'border-red-400 border-2' : ''}`} hidden ref={inputRef}/>

        </div>
            { meta.touched && meta.error
              ? (
                <Label pointing prompt>{meta.error} </Label>
                )
              : null }
        </Form.Field>

  )
}
