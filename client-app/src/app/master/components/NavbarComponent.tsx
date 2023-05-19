import { Label, Menu } from 'semantic-ui-react'
import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite'

export default observer(function NavBarComponent () {
  const { userStore: { user } } = useStore()
  const imageProps = {
    avatar: true,
    spaced: 'right',
    src: '/assets/default-profile-picture.png'
  }
  return (
        // <Menu fixed='top' inverted>
        <Menu fixed='top' style={{ backgroundColor: '#081A51' }}>
            <Menu.Item style={{ flex: 1, textAlign: 'center' }} >
              {/* <div className='items-center'>
                      <img src="./src/assets/logo.png"
                              className="cursor-pointer"/>
                      <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && 'scale-0'}`}>
                          Progresa
                      </h1>
                </div> */}
                <h1 className="text-white origin-left font-medium text-3xl ml-4">
                  PROGRESA
                </h1>
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item>
                  <Label as='a' size='large' content={`${user?.displayName}`} image={imageProps}
                          onClick={() => { console.log('click...') }}
                          style={{ backgroundColor: 'rgba(255,255,255,0.17)', height: '3rem' }}/>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
  )
})
