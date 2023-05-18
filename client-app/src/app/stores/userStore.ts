import { makeAutoObservable } from 'mobx'
import { type UserFormValues, type User } from '../master/models/user'

export default class UserStore {
  user: User | null = null

  constructor () {
    makeAutoObservable(this)
  }

  login = async (creds: UserFormValues) => {
    // try {

    // } catch (error) {
    //   throw error
    // }
    console.log(creds)
  }
}
