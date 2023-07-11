import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { type LaborMarket, type LaborMarketFormValues } from '../master/models/laborMarket'
import agent from '../api/agent'
import { type Pagination, PagingParams } from '../master/models/pagination'
import { format } from 'date-fns'
import { getDayAndHourBySelection } from '../master/common/utilities'

export default class LaborMarketFormsStore {
  laborMarketRecords: LaborMarket[] = []
  laborMarketRecordsRegistry = new Map<string, LaborMarket>()
  laborMarketRecordTotals = new Map<string, number>()
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

  createLaborMarket = async (laborMarket: LaborMarketFormValues) => {
    try {
      this.setLoadingScreen(true)
      await agent.CompanyService.createLaborMarket(laborMarket)
      this.setLaboraMarketTotals()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.setLoadingScreen(false)
      })
    }
  }

  updateLaborMarket = async (laborMarket: LaborMarketFormValues) => {
    try {
      this.setLoadingScreen(true)
      await agent.CompanyService.updateLaborMarket(laborMarket)
      if (laborMarket.id) {
        const updatedLaborMarket = { ...this.getLaborMarketRecord(laborMarket.id), ...laborMarket }
        this.laborMarketRecordsRegistry.set(laborMarket.id, updatedLaborMarket as LaborMarket)
        this.setLaboraMarketTotals()
      }
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.setLoadingScreen(false)
      })
    }
  }

  loadMarketRecords = async () => {
    this.setLoadingScreen(true)
    try {
      const result = await agent.CompanyService.listLaboraMarket(this.axiosParams)
      result.data.forEach(laborMarket => {
        runInAction(() => {
          if (laborMarket.timeDetail && laborMarket.timeDetail !== '0') {
            const result = getDayAndHourBySelection(laborMarket.timeDetail)
            laborMarket.daysWeek = result.days!
            laborMarket.hoursWeek = result.hours!
          }
          if (laborMarket.timeDetailFuture && laborMarket.timeDetailFuture !== '0') {
            const resultFuture = getDayAndHourBySelection(laborMarket.timeDetailFuture)
            laborMarket.daysWeekFuture = resultFuture.days!
            laborMarket.hoursWeekFuture = resultFuture.hours!
          }
        })

        this.setLaborMarket(laborMarket)
        this.setLaboraMarketTotals()
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
        this.setLaboraMarketTotals()
        this.loadingScreen = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loadingScreen = false
      })
    }
  }

  setLaboraMarketTotals = () => {
    this.laborMarketRecordTotals.set('Sub A', Array.from(this.laborMarketRecordsRegistry.values()).reduce((accumulator, laborMarket) => accumulator + laborMarket.subAquantity, 0))
    this.laborMarketRecordTotals.set('Sub B', Array.from(this.laborMarketRecordsRegistry.values()).reduce((accumulator, laborMarket) => accumulator + laborMarket.subBquantity, 0))
    this.laborMarketRecordTotals.set('Sub C', Array.from(this.laborMarketRecordsRegistry.values()).reduce((accumulator, laborMarket) => accumulator + laborMarket.subCquantity, 0))
    this.laborMarketRecordTotals.set('Sub D', Array.from(this.laborMarketRecordsRegistry.values()).reduce((accumulator, laborMarket) => accumulator + laborMarket.subDquantity, 0))
    this.laborMarketRecordTotals.set('Toelating van rechtswege', Array.from(this.laborMarketRecordsRegistry.values()).reduce((accumulator, laborMarket) => accumulator + laborMarket.autoAdmissionQuantity, 0))
    this.laborMarketRecordTotals.set('VTV', Array.from(this.laborMarketRecordsRegistry.values()).reduce((accumulator, laborMarket) => accumulator + laborMarket.vtvQuantity, 0))
    this.laborMarketRecordTotals.set('VV', Array.from(this.laborMarketRecordsRegistry.values()).reduce((accumulator, laborMarket) => accumulator + laborMarket.vvQuantity, 0))
    this.laborMarketRecordTotals.set('Aantal behoefte', Array.from(this.laborMarketRecordsRegistry.values()).reduce((accumulator, laborMarket) => accumulator + laborMarket.needCount + laborMarket.needCountFuture, 0))
  }
}
