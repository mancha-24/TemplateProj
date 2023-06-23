import { Card, CardBody, CardFooter } from '@material-tailwind/react'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

interface Props {
  title: string
  desc: string
  isPending?: boolean
  buttonAction: () => void
}

export default function SimpleCardComponent (props: Props) {
  return (
    <>
        <Card className='w-96 cursor-pointer shadow-lg shadow-blue-gray-200 mr-5'>
            {/* <BadgeComponent content={`${props.isPending ? '!' : ''}`} pending={props.isPending}/> */}
            <CardBody>
                <h1 className='font-poppins text-2xl text-black'>{props.title}</h1>
                <p className='font-poppins text-base'>
                    {props.desc}
                </p>
            </CardBody>
            <CardFooter className='flex justify-end items-end'>
                <div className='absolute bottom-0 right-0 p-4'>
                    {/* <ButtonComponent content={props.isPending ? 'View' : 'Edit'}
                        buttonAction={props.buttonAction}
                        primary={props.isPending}/> */}
                      <button onClick={props.buttonAction}
                          className='flex items-center p-3 rounded-lg hover:text-blue-gray-200 transition duration-200 font-poppins'>
                          View
                          <ArrowLongRightIcon strokeWidth={2} className="h-5 w-5 ml-2" />
                      </button>
                </div>
            </CardFooter>
        </Card>
    </>

  )
}
