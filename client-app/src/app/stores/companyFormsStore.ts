import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { type LaborMarket, type LaborMarketFormValues } from '../master/models/laborMarket'
import agent from '../api/agent'
import { type Pagination, PagingParams } from '../master/models/pagination'
import { format } from 'date-fns'

export default class CompanyFormsStore {
  laborMarketRecords: LaborMarket[] = []
  laborMarketRecordsRegistry = new Map<string, LaborMarket>()
  selectedLaboraMarketRecord: LaborMarket | undefined = undefined
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
        void this.loadMarketRecords()
      }
    )
  }

  createLaboraMarket = async (laboraMarket: LaborMarketFormValues) => {
    try {
      await agent.CompanyService.createLaboraMarket(laboraMarket)
    } catch (error) {
      throw error
    }
  }

  loadMarketRecords = async () => {
    this.setLoadingScreen(true)
    try {
      const result = await agent.CompanyService.listLaboraMarket(this.axiosParams)
      result.data.forEach(laborMarket => {
        this.setLaborMarket(laborMarket)
      })
      this.setPagination(result.pagination)
      this.setLoadingScreen(false)
    } catch (error) {
      this.setLoadingScreen(false)
      console.log(error)
    }
  }

  loadMarketRecord = async (id: string) => {
    const record = this.getLaborMarketRecord(id)
    if (record) {
      this.selectedLaboraMarketRecord = record
      return record
    }
  }

  getLaborMarketRecord = (id: string) => {
    return this.laborMarketRecordsRegistry.get(id)
  }

  setLoadingScreen = (state: boolean) => {
    this.loadingScreen = state
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

  private readonly setLaborMarket = (laborMarket: LaborMarket) => {
    laborMarket.creationDate = new Date(laborMarket.creationDate!)
    this.laborMarketRecordsRegistry.set(laborMarket.id, laborMarket)
  }

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination
  }

  get groupedLaborMarketRecords () {
    return Object.entries(
      this.laboraMarketRecordsByDate.reduce<Record<string, LaborMarket[]>>((laborMarkets, laborMarket) => {
        const date = format(laborMarket.creationDate!, 'dd MMM yyyy')
        laborMarkets[date] = laborMarkets[date] ? [...laborMarkets[date], laborMarket] : [laborMarket]
        return laborMarkets
      }, {})
    )
  }

  get laboraMarketRecordsByDate () {
    return Array.from(this.laborMarketRecordsRegistry.values()).sort((a, b) => b.creationDate!.getTime() - a.creationDate!.getTime())
  }

  clearLaborMarketRecordsRegistry = () => {
    this.laborMarketRecordsRegistry = new Map<string, LaborMarket>()
  }

  deleteLaborMarket = async (id: string) => {
    this.loadingScreen = true
    try {
      await agent.CompanyService.deleteLaboraMarket(id)
      runInAction(() => {
        this.laborMarketRecordsRegistry.delete(id)
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
