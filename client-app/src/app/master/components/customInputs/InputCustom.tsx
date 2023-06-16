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
}

export default function InputCustom (props: Props) {
  const [field, meta, helpers] = useField(props.name)
  return (
    <>
        <Input {...field} {...props}
            error={meta.touched && !!meta.error}
            variant={props.variant}
            color='teal'
            min={0}
            style={{ fontFamily: 'Poppins, sans-serif' }}
            onBlur={() => { helpers.setTouched(true) }}
            onChange={(e) => { helpers.setValue(e.target.value) }}
        />
        { meta.touched && meta.error
          ? <Label pointing prompt className='font-poppins w-52'>{meta.error} </Label>
          : null
        }
    </>
  )
}
