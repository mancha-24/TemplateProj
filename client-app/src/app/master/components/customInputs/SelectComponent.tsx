import { Select, Option } from '@material-tailwind/react'
import { useField } from 'formik'
import { Label } from 'semantic-ui-react'

interface Props {
  name: string
  options: Array<{
    text: string
    value: string
  }>
  label?: string
  onChange?: (value: string) => void
}

export default function SelectComponent (props: Props) {
  const [field, meta, helpers] = useField(props.name)
  function handleOnChange (value: any) {
    helpers.setValue(value)
    if (props.onChange) {
      props.onChange(value)
    }
  }
  return (
        <>
            <Select {...field} {...props}
                variant='standard'
                onBlur={() => { helpers.setTouched(true) }}
                onChange={(val) => { handleOnChange(val) }}
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 }
                }}
                style={{ fontFamily: 'Poppins, sans-serif' }}
                error={meta.touched && !!meta.error}
                color='teal'>
                    {
                        props.options.map(({ text, value }) => (
                            <Option key={text} value={value} className='font-poppins'>
                                {text}
                            </Option>
                        ))
                    }
            </Select>
            { meta.touched && meta.error
              ? <Label pointing prompt className='font-poppins w-52'>{meta.error} </Label>
              : null
        }
        </>
  )
}
