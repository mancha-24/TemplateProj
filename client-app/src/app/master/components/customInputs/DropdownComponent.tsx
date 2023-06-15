import { useField } from 'formik'
import { Dropdown, Form, Label } from 'semantic-ui-react'

interface Props {
  placeholder: string
  name: string
  options: any
  label?: string
}

export default function DropdownComponent (props: Props) {
  const [field, meta, helpers] = useField(props.name)
  return (
    <Form.Field error={meta.touched && !!meta.error}>
        <label>{props.label}</label>
        <Dropdown
        className='mt-5 p-5 font-poppins w-full'
            clearable
            options={props.options}
            value={field.value || null}
            onChange={(_e, d) => { helpers.setValue(d.value) }}
            onBlur={() => { helpers.setTouched(true) }}
            placeholder={props.placeholder}
            selection
            style={{ border: meta.touched && meta.error ? '2px solid #f87171' : '' }}
            />
        { meta.touched && meta.error
          ? (
                <Label pointing prompt className='font-poppins'>{meta.error} </Label>
            )
          : null }
    </Form.Field>

  )
}
