import { useField } from 'formik'
import DatePicker, { type ReactDatePickerProps } from 'react-datepicker'
import { Label } from 'semantic-ui-react'

export default function MyDateInput (props: Partial<ReactDatePickerProps>) {
  const [field, meta, helpers] = useField(props.name!)
  return (
    <>
        <DatePicker
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={value => { helpers.setValue(value) }}
        />
        { meta.touched && meta.error
          ? <Label pointing prompt className='font-poppins w-52'>{meta.error} </Label>
          : null
        }
    </>

  )
}
