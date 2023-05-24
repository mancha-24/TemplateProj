import { Alert } from '@material-tailwind/react'
import { type colors } from '@material-tailwind/react/types/generic'

interface Props {
  color: colors | undefined
  open: boolean
  text: string
  onClose?: (close: boolean) => void
}

export default function AlertComponent (props: Props) {
  return (
        <Alert open={props.open}
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 100 }
                }}
                color={props.color}
                variant="gradient"
                className='mb-7'>
            <span>{props.text}</span>
        </Alert>
  )
}
