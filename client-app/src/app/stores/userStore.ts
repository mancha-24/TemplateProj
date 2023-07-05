import { makeAutoObservable, runInAction } from 'mobx'
import { type UserFormValues, type User } from '../master/models/user'
import agent from '../api/agent'
import { router } from '../router/Routes'
import { store } from './store'

export default class UserStore {
  user: User | null = null
  constructor () {
    makeAutoObservable(this)
  }

  get isLoggedIn () {
    return !(this.user == null)
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds)
      store.commonStore.setToken(user.token)
      runInAction(() => this.user = user)
      void router.navigate('company')
    } catch (error) {
      throw error
    }
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current()
      runInAction(() => this.user = user)
    } catch (error) {
      console.log(error)
    }
  }

  logout = () => {
    store.commonStore.setToken(null)
    this.user = null
    void router.navigate('/')
  }
}
