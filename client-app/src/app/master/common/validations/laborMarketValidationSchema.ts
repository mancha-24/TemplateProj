import * as Yup from 'yup'

export const laborMarketValidationSchema = Yup.object({
  functionName: Yup.string().required('Function is required'),
  training: Yup.string().required('Opleiding is required'),
  salaryMonth: Yup.number().required('Salary is required').moreThan(0, 'Salary must be greater than 0'),
  timeDetail: Yup.string().required('Arbeidstijd is required'),
  daysWeek: Yup.number().required()// .moreThan(0, 'Days must be greater than 0')
    .lessThan(8, 'Days must be until 7'),
  hoursWeek: Yup.number().required()// .moreThan(0, 'Hours must be greater than 0')
    .lessThan(50, 'Hours must be until 50'),
  trainingFuture: Yup.string().required('Opleiding is required'),
  salaryMonthFuture: Yup.number().required('Salary is required').moreThan(0, 'Salary must be greater than 0'),
  timeDetailFuture: Yup.string().required('Arbeidstijd is required'),
  daysWeekFuture: Yup.number().required()// .moreThan(0, 'Days must be greater than 0')
    .lessThan(8, 'Days must be until 7'),
  hoursWeekFuture: Yup.number().required()// .moreThan(0, 'Hours must be greater than 0')
    .lessThan(50, 'Hours must be until 50'),
  needCount: Yup.number().required('Aantal behoefte is required'),
  needCountFuture: Yup.number().required('Aantal behoefte is required')
})
