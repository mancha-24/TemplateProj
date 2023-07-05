import * as Yup from 'yup'

export const projectOverViewValidationSchema = Yup.object({
  projectName: Yup.string().required('Project Name is required'),
  projectLocation: Yup.string().required('Project Location is required'),
  natureProject: Yup.string().required('Nature of Project is required'),
  startDate: Yup.string().required('Start Date is required').nullable(),
  endDate: Yup.string().required('End Date is required').nullable(),
  client: Yup.string().required('Client is required'),
  personnel: Yup.number().required().moreThan(0, 'Personnel must be greater than 0')
})
