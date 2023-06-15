import { Card, CardBody, CardFooter } from '@material-tailwind/react'
import BadgeComponent from '../../components/BadgeComponent'
import ButtonComponent from '../../components/customInputs/ButtonComponent'

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
            <BadgeComponent content={`${props.isPending ? '!' : ''}`} pending={props.isPending}/>
            <CardBody>
                <h1 className='font-poppins text-2xl text-black'>{props.title}</h1>
                <p className='font-poppins text-base'>
                    {props.desc}
                </p>
            </CardBody>
            <CardFooter className='pt-0 mt-5'>
                <div className='absolute bottom-0 left-0 m-6'>
                    <ButtonComponent content={props.isPending ? 'View' : 'Edit'}
                        buttonAction={props.buttonAction}
                        primary={props.isPending}/>
                </div>
            </CardFooter>
        </Card>
    </>

  )
}
