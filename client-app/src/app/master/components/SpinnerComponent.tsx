import { DotSpinner } from '@uiball/loaders'

interface Props {
  content?: string
}

export default function SpinnerComponent ({ content = '' }: Props) {
  return (
    <div className='flex flex-col items-center mt-8'>
        <DotSpinner size={60} speed={0.9} color='black'/>
        <span className='font-poppins mt-4'>{content}</span>
    </div>
  )
}
