import { createContext, useContext } from 'react'
import UserStore from './userStore'
import CommonStore from './commonStore'
import PermissionStore from './permissionStore'

interface Store {
  userStore: UserStore
  commonStore: CommonStore
  permissionsStore: PermissionStore
}

export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  permissionsStore: new PermissionStore()
}

export const StoreContext = createContext(store)

export function useStore () {
  return useContext(StoreContext)
}
