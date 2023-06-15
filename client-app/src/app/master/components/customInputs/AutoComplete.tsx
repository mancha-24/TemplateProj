import { Input, List, ListItem } from '@material-tailwind/react'
import { useField } from 'formik'
import { type ChangeEvent, useState } from 'react'
import { Label } from 'semantic-ui-react'

interface Props {
  name: string
  label?: string
  type?: string
  items: string[]
}

export default function autoComplete (props: Props) {
  const [field, meta, helpers] = useField(props.name)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    helpers.setTouched(true)
    const text = event.target.value
    if (text) {
      const filtered = props.items.filter(s => s.toLowerCase().includes(text.toLowerCase()))

      setSuggestions(filtered)
      helpers.setValue(text)
    } else {
      setSuggestions([])
      helpers.setValue('')
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSuggestions([])
    helpers.setValue(suggestion)
  }

  return (
    <>
        <Input {...field} {...props}
            error={meta.touched && !!meta.error}
            variant='outlined'
            size='lg'
            color='teal'
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className='w-72'
            onBlur={() => { helpers.setTouched(true) }}
            onChange={handleInputChange}/>
            <List className={`max-h-40 overflow-y-auto font-poppins ${suggestions.length < 1 && 'hidden'}`}>
                {props.items.map((suggestion, index) => (
                    <ListItem key={index} onClick={() => { handleSuggestionClick(suggestion) }} >
                        {suggestion}
                    </ListItem>
                ))}
            </List>
        { meta.touched && meta.error
          ? <Label pointing prompt className='font-poppins w-52'>{meta.error} </Label>
          : null
        }
    </>
  )
}
