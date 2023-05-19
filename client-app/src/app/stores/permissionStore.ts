import { makeAutoObservable, runInAction } from 'mobx'
import { type Permissions } from '../master/models/permissions'
import agent from '../api/agent'

export default class PermissionStore {
  permissions: Permissions[] | null = null
  constructor () {
    makeAutoObservable(this)
  }

  getPermissions = async () => {
    try {
      const permissions = await agent.Permission.permissions()
      runInAction(() => this.permissions = permissions)
    } catch (error) {
      console.log(error)
    }
  }
}
