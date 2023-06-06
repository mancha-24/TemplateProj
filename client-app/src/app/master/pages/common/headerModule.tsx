interface Props {
  title: string
  subtitle: string
}

export default function HeaderModule (props: Props) {
  return (
        <div className='static bg-white cursor-default'>
            <div className='flex justify-start items-center p-5 shadow-sm font-poppins text-xl'>
                <div className='mr-2'>{props.title}</div>
                <div className='mr-2'>|</div>
                <div className='mr-2 font-poppins text-base text-gray-500'>{props.subtitle}</div>
            </div>
        </div>
  )
}
