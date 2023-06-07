import { createContext, useContext } from 'react'
import UserStore from './userStore'
import CommonStore from './commonStore'
import PermissionStore from './permissionStore'
import ModalStore from './modalStore'
import CompanyStore from './companyStore'
import DrawerStore from './drawerStore'

interface Store {
  userStore: UserStore
  commonStore: CommonStore
  permissionsStore: PermissionStore
  modalStore: ModalStore
  drawerStore: DrawerStore
  companyStore: CompanyStore
}

export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  permissionsStore: new PermissionStore(),
  modalStore: new ModalStore(),
  drawerStore: new DrawerStore(),
  companyStore: new CompanyStore()
}

export const StoreContext = createContext(store)

export function useStore () {
  return useContext(StoreContext)
}
