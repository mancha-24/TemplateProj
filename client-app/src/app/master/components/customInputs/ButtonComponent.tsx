
interface Props {
  primary?: boolean
  content?: string
  buttonAction: () => void
}

export default function ButtonComponent ({ primary = false, content = 'Send', buttonAction }: Props) {
  return (
    <button
        className={`
            ${primary
? 'bg-red-500 border-red-500 hover:border-red-300'
                        : 'bg-green-500 border-green-500 hover:border-green-300'}
                        flex items-center justify-center rounded-lg px-6 pb-[6px] pt-2 h-12 w-32
                        text-lg  text-white border-2 font-poppins
                        hover:bg-opacity-70  hover:border-2 transition duration-300
        `}
        onClick={buttonAction}>
    {
        content
    }
    </button>
  )
}
