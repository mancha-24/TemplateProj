export interface LaborMarket {
  id: string
  functionId: string
  functionName: string
  subAquantity: number
  subBquantity: number
  subCquantity: number
  subDquantity: number
  autoAdmissionQuantity: number
  vtvQuantity: number
  vvQuantity: number
  training: string
  salaryMonth: number
  daysWeek: number
  hoursWeek: number
  timeDetail: string
  needCount: number
  trainingFuture: string
  salaryMonthFuture: number
  daysWeekFuture: number
  hoursWeekFuture: number
  timeDetailFuture: string
  needCountFuture: number
  creationDate: Date | null
  quantity: number
}

export class LaborMarket implements LaborMarket {
  constructor (init?: LaborMarketFormValues) {
    Object.assign(this, init)
  }
}

export class LaborMarketFormValues {
  id?: string = undefined
  functionId?: string = undefined
  functionName: string = ''
  subAquantity: number = 0
  subBquantity: number = 0
  subCquantity: number = 0
  subDquantity: number = 0
  autoAdmissionQuantity: number = 0
  vtvQuantity: number = 0
  vvQuantity: number = 0
  training: string = ''
  salaryMonth: number = 1
  daysWeek: number = 0
  hoursWeek: number = 0
  timeDetail: string = ''
  needCount: number = 0
  trainingFuture: string = ''
  salaryMonthFuture: number = 1
  daysWeekFuture: number = 0
  hoursWeekFuture: number = 0
  timeDetailFuture: string = ''
  needCountFuture: number = 0

  constructor (laborMarket?: LaborMarketFormValues) {
    if (laborMarket) {
      this.id = laborMarket.id
      this.functionName = laborMarket.functionName
      this.functionId = laborMarket.functionId
      this.subAquantity = laborMarket.subAquantity
      this.subBquantity = laborMarket.subBquantity
      this.subCquantity = laborMarket.subCquantity
      this.subDquantity = laborMarket.subDquantity
      this.autoAdmissionQuantity = laborMarket.autoAdmissionQuantity
      this.vtvQuantity = laborMarket.vtvQuantity
      this.vvQuantity = laborMarket.vvQuantity
      this.training = laborMarket.training
      this.salaryMonth = laborMarket.salaryMonth
      this.daysWeek = laborMarket.daysWeek
      this.hoursWeek = laborMarket.hoursWeek
      this.timeDetail = laborMarket.timeDetail
      this.needCount = laborMarket.needCount
      this.trainingFuture = laborMarket.trainingFuture
      this.salaryMonthFuture = laborMarket.salaryMonthFuture
      this.daysWeekFuture = laborMarket.daysWeekFuture
      this.hoursWeekFuture = laborMarket.hoursWeekFuture
      this.timeDetailFuture = laborMarket.timeDetailFuture
      this.needCountFuture = laborMarket.needCountFuture
    }
  }
}
