import { Badge, Card, CardBody, CardFooter } from '@material-tailwind/react'

interface Props {
  title: string
  desc: string
  buttonText: string
  clickAction: () => void
}

export default function SimpleCardComponent (props: Props) {
  return (
    <>
        <div className='flex justify-between px-24'>
            <Badge className='shadow-lg' color='red' content='!'>
                <Card className='w-96 cursor-pointer shadow-lg shadow-blue-gray-200'>
                    <CardBody>
                        <h1 className='font-poppins text-2xl text-black'>{props.title}</h1>
                        <p className='font-poppins text-base'>
                            {props.desc}
                        </p>
                    </CardBody>
                    <CardFooter className='pt-0'>
                        <button className='flex items-center justify-center rounded-lg px-6 pb-[6px] pt-2 h-12 w-32
                                            text-lg bg-red-500 text-white border-2 border-red-500 font-poppins
                                            hover:bg-opacity-70 hover:border-red-300 hover:border-2 transition duration-300'
                                            onClick={props.clickAction}>
                            {props.buttonText}
                        </button>
                    </CardFooter>
                </Card>
            </Badge>
        </div>
    </>

  )
}
