import { makeAutoObservable, reaction } from 'mobx'
import { store } from './store'
import { type MenuItems } from '../master/types/menuItems'

export default class CommonStore {
  token: string | null = localStorage.getItem('jwt')
  menuItems: MenuItems[] = []
  appLoaded = false
  constructor () {
    makeAutoObservable(this)
    reaction(
      () => this.token,
      token => {
        if (token != null) {
          localStorage.setItem('jwt', token)
        } else {
          localStorage.removeItem('jwt')
        }
      }
    )
  }

  setToken = (token: string | null) => {
    this.token = token
  }

  setAppLoaded = () => {
    this.appLoaded = true
  }

  loadMenuItems = () => {
    const dashboardMenu: MenuItems = {
      action: '/home',
      gap: false,
      title: 'Dashboard',
      src: 'Chart_fill'
    }
    this.menuItems.push(dashboardMenu)
    const permissions = store.permissionsStore.permissions
    permissions?.forEach((item) => {
      switch (item.permissionName) {
        case 'Pages.Administration.Users':
          // const menuUsers: MenuItems = {
          //   action: '/user-page',
          //   gap: false,
          //   title: 'Accounts',
          //   src: 'User'
          // }
          // this.menuItems.push(menuUsers)
          break
        case 'Pages.Administration':
          const menuAdmin: MenuItems = {
            action: '/companyPortal',
            gap: false,
            title: 'Company Users',
            src: 'Setting'
          }
          this.menuItems.push(menuAdmin)
          break
        default:
          break
      }
    })
  }
}
