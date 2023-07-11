import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@material-tailwind/react'

interface Props {
  title: string
  desc: string
}

export default function TooltipComponent (props: Props) {
  return (
        <>
            <Tooltip content={
                <div className='w-80'>
                <p className='font-poppins text-lg pt-2 px-2'>
                    {props.title}
                </p>
                <p className='font-poppins text-sm pb-2 px-2'>
                    {props.desc}
                </p>
                </div>
            } className='tooltip-container' placement='right-end'>
                <InformationCircleIcon
                strokeWidth={2}
                className='text-blue-gray-500 w-5 h-5 cursor-pointer mt-2'
                />
            </Tooltip>
        </>
  )
}
