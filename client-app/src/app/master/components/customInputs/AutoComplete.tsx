import { Input, List, ListItem } from '@material-tailwind/react'
import { useField } from 'formik'
import { type ChangeEvent, useState } from 'react'
import { Label } from 'semantic-ui-react'

interface Props {
  name: string
  label?: string
  type?: string
  items: Array<{ value: string, text: string }>
}

export default function AutoComplete (props: Props) {
  const [field, meta, helpers] = useField(props.name)
  const [suggestions, setSuggestions] = useState<Array<{ value: string, text: string }>>([])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    helpers.setTouched(true)
    const text = event.target.value
    if (text) {
      const filtered = props.items.filter(s => s.text.toLowerCase().includes(text.toLowerCase()))
      setSuggestions(filtered)
      helpers.setValue(text)
    } else {
      setSuggestions([])
      helpers.setValue('')
    }
  }

  const handleSuggestionClick = (suggestion: { value: string, text: string }) => {
    setSuggestions([])
    helpers.setValue(suggestion.text)
    helpers.setTouched(true)
  }

  return (
    <>
        <Input {...field} {...props}
            error={meta.touched && !!meta.error}
            id={props.name}
            variant='outlined'
            size='lg'
            color='teal'
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className='w-72'
            onBlur={() => { helpers.setTouched(true) }}
            onChange={handleInputChange}/>
            <List className={`max-h-40 overflow-y-auto font-poppins ${suggestions.length < 1 && 'hidden'}`}>
                {suggestions.map((suggestion, index) => (
                    <ListItem key={index} onClick={() => { handleSuggestionClick(suggestion) }} >
                        {suggestion.text}
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
