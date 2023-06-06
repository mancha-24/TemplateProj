interface Props {
  title: string
  subtitle: string
}

export default function HeaderModule (props: Props) {
  return (
        <div className='static bg-white'>
            <div className='flex justify-start p-5 shadow-sm'>
                <div className='mr-2'>{props.title}</div>
                <div className='mr-2'>|</div>
                <div className='mr-2'>{props.subtitle}</div>
            </div>
        </div>
  )
}
