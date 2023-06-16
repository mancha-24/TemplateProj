import * as Yup from 'yup'

export const laborMarketValidationSchema = Yup.object({
  functionName: Yup.string().required('Function is required'),
  training: Yup.string().required('Opleiding is required'),
  salaryMonth: Yup.number().required().moreThan(0, 'Salary must be greater than 0'),
  daysWeek: Yup.number().required().moreThan(0, 'Days must be greater than 0')
    .lessThan(8, 'Days must be until 7'),
  hoursWeek: Yup.number().required().moreThan(0, 'Hours must be greater than 0')
    .lessThan(50, 'Hours must be until 50')
})
