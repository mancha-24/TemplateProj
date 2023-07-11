export interface SubContractor {
  id: string
  functionId: string
  functionName: string
  name: string
  // since: string
  employeesNumber: number
  creationDate: Date | null
  needEmployees: boolean
}

export class SubContractor implements SubContractor {
  constructor (init?: SubContractorFormValues) {
    Object.assign(this, init)
  }
}

export class SubContractorFormValues {
  id?: string = undefined
  functionId?: string = undefined
  functionName: string = ''
  name: string = ''
  // since: string = ''
  employeesNumber: number = 0
  needEmployees: boolean = false

  constructor (subContractor?: SubContractorFormValues) {
    if (subContractor) {
      this.id = subContractor.id
      this.functionId = subContractor.functionId
      this.functionName = subContractor.functionName
      this.name = subContractor.name
      // this.since = subContractor.since
      this.employeesNumber = subContractor.employeesNumber
      this.needEmployees = subContractor.needEmployees
    }
  }
}
