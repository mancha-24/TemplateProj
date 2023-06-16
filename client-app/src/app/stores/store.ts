import { createContext, useContext } from 'react'
import UserStore from './userStore'
import CommonStore from './commonStore'
import PermissionStore from './permissionStore'
import ModalStore from './modalStore'
import CompanyStore from './companyStore'
import DrawerStore from './drawerStore'
import MasterDataStore from './masterDataStore'
import CompanyFormsStore from './companyFormsStore'

interface Store {
  userStore: UserStore
  commonStore: CommonStore
  permissionsStore: PermissionStore
  modalStore: ModalStore
  drawerStore: DrawerStore
  companyStore: CompanyStore
  companyFormsStore: CompanyFormsStore
  masterDataStore: MasterDataStore
}

export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  permissionsStore: new PermissionStore(),
  modalStore: new ModalStore(),
  drawerStore: new DrawerStore(),
  companyStore: new CompanyStore(),
  companyFormsStore: new CompanyFormsStore(),
  masterDataStore: new MasterDataStore()
}

export const StoreContext = createContext(store)

export function useStore () {
  return useContext(StoreContext)
}
