export interface Company {
  id: string
  trade: string
  regName: string
  kvkNumber: string
}

export class Company implements Company {
  constructor (init?: CompanyFormValues) {
    Object.assign(this, init)
  }
}

export class CompanyFormValues {
  id?: string = undefined
  trade: string = ''
  regName: string = ''
  kvkNumber: string = ''
  director: string = ''
  address: string = ''
  phone: string = ''
  emailCompany: string = ''
  svbNumber: string = ''
  sector: string = ''
  email: string = ''
  password: string = ''
  kvkDoc: string = ''
  ownerDoc: string = ''
  validExtractCoC: string = ''
  copyOfMinisterialPermitDEZHI: string = ''
  copyOfDirectorPermit: string = ''
  copyOfResidencePermitDirector: string = ''
  copyOfIDDirector: string = ''
  copyOfValidContractsProjects: string = ''

  constructor (company?: CompanyFormValues) {
    if (company) {
      this.id = company.id
      this.trade = company.trade
      this.regName = company.regName
      this.kvkNumber = company.kvkNumber
      this.director = company.director
      this.address = company.address
      this.phone = company.phone
      this.emailCompany = company.emailCompany
      this.svbNumber = company.svbNumber
      this.sector = company.sector
      this.email = company.email
      this.password = company.password
      this.kvkDoc = company.kvkDoc
      this.ownerDoc = company.ownerDoc
      this.validExtractCoC = company.validExtractCoC
      this.copyOfMinisterialPermitDEZHI = company.copyOfMinisterialPermitDEZHI
      this.copyOfDirectorPermit = company.copyOfDirectorPermit
      this.copyOfResidencePermitDirector = company.copyOfResidencePermitDirector
      this.copyOfIDDirector = company.copyOfIDDirector
      this.copyOfValidContractsProjects = company.copyOfValidContractsProjects
    }
  }
}
