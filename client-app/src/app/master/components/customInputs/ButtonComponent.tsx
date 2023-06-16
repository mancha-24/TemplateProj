import { Ring } from '@uiball/loaders'

interface Props {
  primary?: boolean
  content?: string
  buttonAction: () => void
  disabled?: boolean
  isSubmitting?: boolean
}

export default function ButtonComponent ({ primary = false, content = 'Send', buttonAction, disabled = false, isSubmitting = false }: Props) {
  return (
    <button type='submit'
        className={`
            ${
              disabled
                ? 'text-gray-400'
              : primary
                ? 'bg-red-500 border-red-500 hover:border-red-300 text-white'
              : 'bg-green-500 border-green-500 hover:border-green-300 text-white'}
              
              flex items-center justify-center rounded-lg px-6 pb-[6px] pt-2 h-12 w-32
              text-lg border-2 font-poppins
              hover:bg-opacity-70  hover:border-2 transition duration-300
        `}
        onClick={buttonAction}
        disabled={disabled}>
        {!isSubmitting
          ? content
          : <Ring
            size={25}
            lineWeight={7}
            speed={3}
            color="white"/>
        }
    </button>
  )
}
