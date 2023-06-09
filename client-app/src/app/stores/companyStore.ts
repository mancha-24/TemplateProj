import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { type Company, type CompanyFormValues } from '../master/models/company'
import agent from '../api/agent'
import { type Pagination, PagingParams } from '../master/models/pagination'
import { format } from 'date-fns'

export default class CompanyStore {
  companies: Company[] = []
  companyRegistry = new Map<string, Company>()
  selectedCompany: Company | undefined = undefined
  loadingScreen = false
  pagingParams = new PagingParams()
  pagination: Pagination | null = null
  predicate = new Map().set('all', true)
  constructor () {
    makeAutoObservable(this)
    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams()
        void this.loadCompanies()
      }
    )
  }

  create = async (company: CompanyFormValues) => {
    try {
      await agent.CompanyService.create(company)
    } catch (error) {
      throw error
    }
  }

  loadCompany = async (id: string | undefined) => {
    this.setLoadingScreen(true)
    await agent.sleep(1000)

    try {
      let company: Company
      if (id) {
        company = await agent.CompanyService.details(id)
      } else {
        company = await agent.CompanyService.current()
      }

      this.setCompany(company)
      runInAction(() => this.selectedCompany = company)
      this.setLoadingScreen(false)
    } catch (error) {
      console.log(error)
      this.setLoadingScreen(false)
    }
  }

  loadCompanies = async () => {
    this.setLoadingScreen(true)
    try {
      const result = await agent.CompanyService.list(this.axiosParams)
      console.log('result', result)
      result.data.forEach(company => {
        this.setCompany(company)
      })
      this.setPagination(result.pagination)
      this.setLoadingScreen(false)
    } catch (error) {
      this.setLoadingScreen(false)
      console.log(error)
    }
  }

  private readonly setCompany = (company: Company) => {
    company.creationDate = new Date(company.creationDate!)
    this.companyRegistry.set(company.id, company)
  }

  clearSelectedCompany = () => {
    this.selectedCompany = undefined
  }

  setLoadingScreen = (state: boolean) => {
    this.loadingScreen = state
  }

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination
  }

  get axiosParams () {
    const params = new URLSearchParams()
    params.append('pageNumber', this.pagingParams.pageNumber.toString())
    params.append('pageSize', this.pagingParams.pageSize.toString())
    this.predicate.forEach((value, key) => {
      if (key === 'startDate') {
        params.append(key, (value as Date).toISOString())
      } else {
        params.append(key, value)
      }
    })
    return params
  }

  get groupedCompanies () {
    return Object.entries(
      this.companiesByDate.reduce<Record<string, Company[]>>((companies, company) => {
        const date = format(company.creationDate!, 'dd MMM yyyy')
        companies[date] = companies[date] ? [...companies[date], company] : [company]
        return companies
      }, {})
    )
  }

  get companiesByDate () {
    return Array.from(this.companyRegistry.values()).sort((a, b) => b.creationDate!.getTime() - a.creationDate!.getTime())
  }
}
