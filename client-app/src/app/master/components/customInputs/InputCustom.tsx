import { Input } from '@material-tailwind/react'
import { type variant } from '@material-tailwind/react/types/components/input'
import { useField } from 'formik'
import { Label } from 'semantic-ui-react'

interface Props {
  name: string
  label?: string
  type?: string
  max?: number
  variant?: variant
  step?: string
  disabled?: boolean
  onChange?: (value: any) => void
}

export default function InputCustom (props: Props) {
  const [field, meta, helpers] = useField(props.name)
  function handleOnChange (value: any) {
    helpers.setValue(value)
    if (props.onChange) {
      props.onChange(value)
    }
  }
  return (
    <>
        <Input {...field} {...props}
            error={meta.touched && !!meta.error}
            variant={props.variant}
            color='teal'
            min={0}
            style={{ fontFamily: 'Poppins, sans-serif' }}
            onBlur={() => { helpers.setTouched(true) }}
            onChange={(e) => { handleOnChange(e.target.value) }}
            // value={undefined}
        />
        { meta.touched && meta.error
          ? <Label pointing prompt className='font-poppins w-52'>{meta.error} </Label>
          : null
        }
    </>
  )
}
