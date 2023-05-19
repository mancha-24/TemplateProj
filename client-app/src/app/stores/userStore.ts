import { makeAutoObservable, runInAction } from 'mobx'
import { type UserFormValues, type User } from '../master/models/user'
import agent from '../api/agent'
import { router } from '../router/Routes'

export default class UserStore {
  user: User | null = null

  constructor () {
    makeAutoObservable(this)
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds)
      runInAction(() => this.user = user)
      void router.navigate('home')
    } catch (error) {
      throw error
    }
  }
}
