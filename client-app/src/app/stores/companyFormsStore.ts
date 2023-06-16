import { makeAutoObservable } from 'mobx'
import { type LaborMarketFormValues } from '../master/models/laborMarket'
import agent from '../api/agent'

export default class CompanyFormsStore {
  constructor () {
    makeAutoObservable(this)
  }

  createLaboraMarket = async (laboraMarket: LaborMarketFormValues) => {
    try {
      await agent.CompanyService.createLaboraMarket(laboraMarket)
    } catch (error) {
      throw error
    }
  }
}
