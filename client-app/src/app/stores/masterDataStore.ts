import { makeAutoObservable, runInAction } from 'mobx'
import { type CompanyFunction } from '../master/models/companyFunction'
import agent from '../api/agent'

export default class MasterDataStore {
  functions: CompanyFunction[] = []
  loading = false
  constructor () {
    makeAutoObservable(this)
  }

  loadFunctionsDropdown = async () => {
    try {
      const functions = await agent.Function.list()
      runInAction(() => this.functions = functions)
    } catch (error) {
      console.log(error)
    }
  }
}
