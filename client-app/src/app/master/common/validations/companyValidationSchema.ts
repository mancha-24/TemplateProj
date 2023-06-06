import * as Yup from 'yup'

export const companyValidationSchema = Yup.object({
  trade: Yup.string().required('Handels naam is required'),
  regName: Yup.string().required('Registratie naam is required'),
  kvkNumber: Yup.string().required('# Kvk is required'),
  director: Yup.string().required('Naar directeur is required'),
  address: Yup.string().required('Adres is required'),
  phone: Yup.string().required('Telefoon is required'),
  emailCompany: Yup.string().required('Email is required').email('Incorrect Format'),
  svbNumber: Yup.string().required('# SVB is required'),
  kvkDoc: Yup.string().required('KvK document is required'),
  ownerDoc: Yup.string().required('ID van eigenaar is required'),
  sector: Yup.string().required('Sector is required'),
  email: Yup.string().required('Email is required').email('Incorrect Format'),
  password: Yup.string().required('Password is required').min(3, 'must be at least 3 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 6 characters long and contain at least one letter and one number'),
  validExtractCoC: Yup.string().required('This file is required'),
  copyOfMinisterialPermitDEZHI: Yup.string().required('This file is required'),
  copyOfDirectorPermit: Yup.string().required('This file is required'),
  copyOfResidencePermitDirector: Yup.string().required('This file is required'),
  copyOfIDDirector: Yup.string().required('This file is required'),
  copyOfValidContractsProjects: Yup.string().required('This file is required')
})
