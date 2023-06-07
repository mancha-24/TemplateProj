import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Dimmer, Segment } from 'semantic-ui-react'
import { type MenuItems } from '../types/menuItems'

interface Props {
  menuItems: MenuItems[]
}

export default observer(function MenuComponent ({ menuItems }: Props) {
  const [open, setOpen] = useState(true)
  const componentRef = useRef<HTMLDivElement | null>(null)

  const [selectedMenu, setSelectedMenu] = useState<number | null>(null)
  const handleMenuClick = (index: number) => {
    setSelectedMenu(index)
  }

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
        <div className='flex absolute top-0 left-0 w-full h-full'>
            <div className={`${open ? 'w-72' : 'w-24'} duration-300 h-screen p-5 pt-20 bg-gray-900 relative`} ref={componentRef}>
                <div className={`flex ${open ? 'justify-end' : 'justify-center'} mt-8`}>
                    <img src="/assets/arrow.png"
                        className={`cursor-pointer rounded-full w-4 top-24 absolute
                                    border-2 border-dark-purple ${!open && 'rotate-180'}`}
                        onClick={() => { setOpen(!open) }}/>
                </div>
                <ul className='pt-5'>
                    {menuItems.map((menu, index) => (
                        <Link to={menu.action} key={index}>
                          <li key={index} className={`text-gray-300 text-lg flex justify-normal items-center gap-x-4 cursor-pointer p-2 rounded-md h-12
                                          
                                          hover:bg-blue-900 transition duration-300
                                          ${(menu.gap ?? false) ? 'mt-9' : 'mt-2'}
                                          ${selectedMenu === index && 'bg-blue-900 border-blue-500 border-2 transition duration-300'}`}
                                          onClick={() => { handleMenuClick(index) }}>
                              <img src={`/assets/${menu.src}.png`} className='h-9'/>
                              <span className={`${!open && 'hidden'} origin-left duration-200 font-poppins`}>{menu.title}</span>
                          </li>
                        </Link>
                    ))}
                </ul>
            </div>
            <Dimmer.Dimmable as={Segment} dimmed={open} className="outlet-box">
                <Dimmer/>
                <Outlet/>
            </Dimmer.Dimmable>

        </div>
  )
})
