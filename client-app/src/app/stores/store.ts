import { createContext, useContext } from 'react'
import UserStore from './userStore'
import CommonStore from './commonStore'
import PermissionStore from './permissionStore'
import ModalStore from './modalStore'

interface Store {
  userStore: UserStore
  commonStore: CommonStore
  permissionsStore: PermissionStore
  modalStore: ModalStore
}

export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  permissionsStore: new PermissionStore(),
  modalStore: new ModalStore()
}

export const StoreContext = createContext(store)

export function useStore () {
  return useContext(StoreContext)
}
