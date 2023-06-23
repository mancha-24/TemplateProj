import { makeAutoObservable, runInAction } from 'mobx'
import { type CompanyFunction } from '../master/models/companyFunction'
import agent from '../api/agent'

export default class MasterDataStore {
  functions: CompanyFunction[] = []
  functionToDropDown: Array<{ value: string, text: string }> = []
  loading = false
  constructor () {
    makeAutoObservable(this)
  }

  loadFunctionsDropdown = async () => {
    try {
      const functions = await agent.Function.list()
      runInAction(() => {
        this.functions = functions
        this.functionToDropDown = functions.map((f) => ({
          value: f.id,
          text: f.name
        }))
      })
    } catch (error) {
      console.log(error)
    }
  }

  loadFunctionsCompanyDropdown = async () => {
    try {
      const functions = await agent.Function.listByCompany()
      runInAction(() => {
        this.functions = functions
        this.functionToDropDown = functions.map((f) => ({
          value: f.id,
          text: f.name
        }))
      })
    } catch (error) {
      console.log(error)
    }
  }
}
