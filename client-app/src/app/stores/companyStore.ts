import { makeAutoObservable } from 'mobx'
import { type CompanyFormValues } from '../master/models/company'
import agent from '../api/agent'

export default class CompanyStore {
  constructor () {
    makeAutoObservable(this)
  }

  create = async (company: CompanyFormValues) => {
    try {
      await agent.Company.create(company)
    } catch (error) {
      throw error
    }
  }
}
