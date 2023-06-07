import { makeAutoObservable, runInAction } from 'mobx'
import { type Company, type CompanyFormValues } from '../master/models/company'
import agent from '../api/agent'

export default class CompanyStore {
  companyRegistry = new Map<string, Company>()
  selectedCompany: Company | undefined = undefined
  loadingScreen = false
  constructor () {
    makeAutoObservable(this)
  }

  create = async (company: CompanyFormValues) => {
    try {
      await agent.CompanyService.create(company)
    } catch (error) {
      throw error
    }
  }

  loadCompany = async (id: string) => {
    this.setLoadingScreen(true)
    await agent.sleep(1000)

    try {
      const company = await agent.CompanyService.details(id)
      console.log(company)
      this.setCompany(company)
      runInAction(() => this.selectedCompany = company)
      this.setLoadingScreen(false)
    } catch (error) {
      console.log(error)
      this.setLoadingScreen(false)
    }
  }

  private readonly setCompany = (company: Company) => {
    this.companyRegistry.set(company.id, company)
  }

  clearSelectedCompany = () => {
    this.selectedCompany = undefined
  }

  setLoadingScreen = (state: boolean) => {
    this.loadingScreen = state
  }
}
