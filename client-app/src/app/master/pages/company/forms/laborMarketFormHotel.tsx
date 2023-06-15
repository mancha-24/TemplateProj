import { Input, List, ListItem } from '@material-tailwind/react'
import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useState, type ChangeEvent } from 'react'

const randomStrings = [
  'prueba',
  'test',
  'manuel',
  'ortega',
  'francisco'
]

export default observer(function LaborMarketFormHotel () {
  const [searchText, setSearchText] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    if (text) {
      const filtered = randomStrings.filter(s => s.includes(text))
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
    setSearchText(text)
  }
  const handleSuggestionClick = (suggestion: string) => {
    setSearchText(suggestion)
    setSuggestions([]) // Clear suggestions when selecting one
  }

  return (
        <Formik
            onSubmit={async (values) => {
              console.log(values)
            } }
        enableReinitialize
        initialValues={{ input1: '', input2: '', error: null }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} autoComplete='off' className='p-8 pt-0'>
                    <h2 className='font-poppins font-semibold text-black text-3xl text-left mb-5'>Labor Market Registration </h2>
                    <div className='w-1 p-8 font-poppins'>
                      <Input label='Function' onChange={handleInputChange} variant='standard' value={searchText}/>
                      <List className='z-[9999]'>
                        {suggestions.map((suggestion, index) => (
                        <ListItem key={index} onClick={() => { handleSuggestionClick(suggestion) }}>
                          {suggestion}
                        </ListItem>
                        ))}
                      </List>
                    </div>
                    <div className='grid grid-cols-4 gap-4 h-full w-full border-2 border-gray-200 rounded-lg shadow-lg p-8 font-poppins'>
                      <span className='col-span-4 font-poppins text-black text-xl mb-2'>Niet-Toelatingsplichtig</span>
                      <div className='w-1'>
                        <Input label='Sub A' variant='standard' type='number' max={5} min={0} />
                      </div>
                      <div className='w-1'>
                        <Input label='Sub B' variant='standard' type='number' max={5} min={0} />
                      </div>
                      <div className='w-1'>
                        <Input label='Sub C' variant='standard' type='number' max={5} min={0} />
                      </div>
                      <div className='w-1'>
                        <Input label='Sub D' variant='standard' type='number' max={5} min={0} />
                      </div>

                      <div className='w-1 mt-5'>
                        <Input label='Toelating van rechtswege' variant='standard' type='number' max={5} min={0} />
                      </div>
                    </div>
                    <div className='mt-4 grid grid-cols-4 gap-4 h-full w-full border-2 border-gray-200 rounded-lg shadow-lg p-8 font-poppins'>
                      <span className='col-span-4 font-poppins text-black text-xl mb-2'>Toelatingsplichtig</span>
                      <div className='w-1'>
                        <Input label='VTV' variant='standard' type='number' max={5} min={0} />
                      </div>
                      <div className='w-1'>
                        <Input label='VV' variant='standard' type='number' max={5} min={0} />
                      </div>
                    </div>
                    <div className='mt-4 grid grid-cols-4 gap-4 h-full w-full border-2 border-gray-200 rounded-lg shadow-lg p-8 font-poppins'>
                      <span className='col-span-4 font-poppins text-black text-xl mb-2'>Voor Huidig en Toekomstige Personeel 2023</span>
                      <div className='w-1'>
                        <Input label='Opleiding' variant='standard' type='number' max={5} min={0} />
                      </div>
                      <div className='w-1'>
                        <Input label='Bruto salaris per maand' variant='standard' type='number' max={5} min={0} />
                      </div>
                      <div className='w-1'>
                        <Input label='Arbeids dagen per week' variant='standard' type='number' max={5} min={0} />
                      </div>
                      <div className='w-1'>
                        <Input label='Arbeids uren per week' variant='standard' type='number' max={5} min={0} />
                      </div>
                    </div>
                </Form>
            )}
        </Formik>
  )
})
