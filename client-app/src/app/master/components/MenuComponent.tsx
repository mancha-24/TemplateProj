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

  return (
        <div className="flex absolute top-0 left-0 w-full h-full">
            <div className={`${open ? 'w-72' : 'w-24'} duration-300 h-screen p-5 pt-20 bg-gray-800 relative`} ref={componentRef}>
                <div className={`flex ${open ? 'justify-end' : 'justify-center'} mt-8`}>
                    <img src="/assets/arrow.png"
                        className={`cursor-pointer rounded-full w-4 top-24 absolute
                                    border-2 border-dark-purple ${!open && 'rotate-180'}`}
                        onClick={() => { setOpen(!open) }}/>
                </div>
                <ul className='pt-5'>
                    {menuItems.map((menu, index) => (
                        <li key={index} className={`text-gray-300 text-lg flex items-center gap-x-4 cursor-pointer 
                                  p-2 hover:bg-orange-300 rounded-md h-12
                                        ${(menu.gap ?? false) ? 'mt-9' : 'mt-2'}
                                         ${index === 0 && 'bg-orange-600 text-gray-100'}`}>
                            <img src={`/assets/${menu.src}.png`} className='h-8'/>
                            <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Dimmer.Dimmable as={Segment} dimmed={open} className="outlet-box">
                <Dimmer simple/>
                <Outlet/>
            </Dimmer.Dimmable>
        </div>
  )
})
