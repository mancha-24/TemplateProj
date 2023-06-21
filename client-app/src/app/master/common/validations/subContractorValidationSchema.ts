import * as Yup from 'yup'

export const subContractorValidationSchema = Yup.object({
  functionName: Yup.string().required('Function is required'),
  name: Yup.string().required('Contract Name is required'),
  since: Yup.string().required('Since is required'),
  employeesNumber: Yup.number().required().moreThan(0, 'Employees must be greater than 0')
})
