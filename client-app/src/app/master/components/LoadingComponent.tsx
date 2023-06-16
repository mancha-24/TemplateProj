import { LeapFrog } from '@uiball/loaders'
import { Dimmer } from 'semantic-ui-react'

interface Props {
  inverted?: boolean
}

export default function LoadingComponent ({ inverted = false }: Props) {
  return (
        <Dimmer active={true} inverted={inverted}>
            <LeapFrog size={60} speed={2.5} color='black'/>
        </Dimmer>
  )
}
