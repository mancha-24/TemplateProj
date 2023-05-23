import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Dimmer, Segment } from 'semantic-ui-react'
import { type MenuItems } from '../types/menuItems'

interface Props {
  menuItems: MenuItems[]
}

export default observer(function MenuComponent ({ menuItems }: Props) {
  const [open, setOpen] = useState(true)
  const componentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside (event: MouseEvent) {
      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  //   const Menus = [
  //     { title: 'Dashboard', src: 'Chart_fill' },
  //     { title: 'Inbox', src: 'Chat' },
  //     { title: 'Accounts', src: 'User', gap: true },
  //     { title: 'Schedule ', src: 'Calendar' },
  //     { title: 'Search', src: 'Search' },
  //     { title: 'Analytics', src: 'Chart' },
  //     { title: 'Files ', src: 'Folder', gap: true },
  //     { title: 'Setting', src: 'Setting' }
  //   ]

  return (
        <div className="flex">
            <div className={`${open ? 'w-72' : 'w-24'} duration-300 h-screen p-5 pt-8 bg-dark-purple relative`} ref={componentRef}>
                <div className={`flex ${open ? 'justify-end' : 'justify-center'} mt-4`}>
                    <img src="./src/assets/arrow.png"
                        className={`cursor-pointer rounded-full w-4 top-20 absolute
                                    border-2 border-dark-purple ${!open && 'rotate-180'}`}
                        onClick={() => { setOpen(!open) }}/>
                </div>
                <ul className='pt-16'>
                    {menuItems.map((menu, index) => (
                        <li key={index} className={`text-gray-300 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-gray rounded-md 
                                        ${(menu.gap ?? false) ? 'mt-9' : 'mt-2'}
                                         ${index === 0 && 'bg-light-gray'}`}>
                            <img src={`./src/assets/${menu.src}.png`}/>
                            <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                            {/* <ul className="absolute left-0 top-full bg-white shadow rounded-md p-2">
                                {menu.subMenu?.map((submenu, ind) => (
                                    <li key={ind} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md">
                                        <span>{submenu.title}</span>
                                    </li>
                                ))}
                            </ul> */}
                        </li>
                    ))}
                </ul>

            </div>
            <Dimmer.Dimmable as={Segment} dimmed={open} className="outlet-box" style={{ marginTop: '5rem' }}>
                <Dimmer simple/>
                <Outlet/>
            </Dimmer.Dimmable>
        </div>
  )
})
