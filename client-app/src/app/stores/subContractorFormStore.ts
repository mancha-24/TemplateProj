import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { type SubContractorFormValues, type SubContractor } from '../master/models/subContractor'
import { type Pagination, PagingParams } from '../master/models/pagination'
import agent from '../api/agent'
import { format } from 'date-fns'

export default class SubContractorFormStore {
  pagingParams = new PagingParams()
  predicate = new Map().set('all', true)
  subContractorRegistry = new Map<string, SubContractor>()
  selectedSubContractor: SubContractor | undefined = undefined
  loadingScreen = false
  pagination: Pagination | null = null
  constructor () {
    makeAutoObservable(this)
    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams()
        void this.loadSubContractors()
      }
    )
  }

  loadSubContractors = async () => {
    this.setLoadingScreen(true)
    try {
      const result = await agent.CompanyService.listSubContractors(this.axiosParams)
      result.data.forEach(subContractor => {
        this.setSubContractor(subContractor)
        // this.setLaboraMarketTotals()
      })
      this.setPagination(result.pagination)
      this.setLoadingScreen(false)
    } catch (error) {
      this.setLoadingScreen(false)
      console.log(error)
    }
  }

  loadSubContractor = async (id: string) => {
    const record = this.getSubContractor(id)
    if (record) {
      this.selectedSubContractor = record
      return record
    }
  }

  clearSubContractorRegistry = () => {
    this.subContractorRegistry = new Map<string, SubContractor>()
  }

  getSubContractor = (id: string) => {
    return this.subContractorRegistry.get(id)
  }

  get groupedSubContractors () {
    return Object.entries(
      this.subContractorsByDate.reduce<Record<string, SubContractor[]>>((subContractors, subContractor) => {
        const date = format(subContractor.creationDate!, 'dd MMM yyyy')
        subContractors[date] = subContractors[date] ? [...subContractors[date], subContractor] : [subContractor]
        return subContractors
      }, {})
    )
  }

  get subContractorsByDate () {
    return Array.from(this.subContractorRegistry.values()).sort((a, b) => b.creationDate!.getTime() - a.creationDate!.getTime())
  }

  setLoadingScreen = (state: boolean) => {
    this.loadingScreen = state
  }

  private readonly setSubContractor = (subContractor: SubContractor) => {
    subContractor.creationDate = new Date(subContractor.creationDate!)
    this.subContractorRegistry.set(subContractor.id, subContractor)
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

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination
  }

  createSubContractor = async (subContractor: SubContractorFormValues) => {
    try {
      this.setLoadingScreen(true)
      await agent.CompanyService.createSubContractor(subContractor)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.setLoadingScreen(false)
      })
    }
  }

  updateSubContractor = async (subContractor: SubContractorFormValues) => {
    try {
      this.setLoadingScreen(true)
      await agent.CompanyService.updateSubContractor(subContractor)
      if (subContractor.id) {
        const updatedSubContractor = { ...this.getSubContractor(subContractor.id), ...subContractor }
        this.subContractorRegistry.set(subContractor.id, updatedSubContractor as SubContractor)
      }
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.setLoadingScreen(false)
      })
    }
  }

  deleteSubContractor = async (id: string) => {
    this.loadingScreen = true
    try {
      await agent.CompanyService.deleteSubContractor(id)
      runInAction(() => {
        this.subContractorRegistry.delete(id)
        this.loadingScreen = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loadingScreen = false
      })
    }
  }
}
