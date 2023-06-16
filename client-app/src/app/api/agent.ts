import axios, { type AxiosResponse, type AxiosError, type AxiosHeaders } from 'axios'
import { type User, type UserFormValues } from '../master/models/user'
import { toast } from 'react-toastify'
import { store } from '../stores/store'
import { type Permissions } from '../master/models/permissions'
import { type Company, type CompanyFormValues } from '../master/models/company'
import { PaginatedResult } from '../master/models/pagination'
import { type CompanyFunction } from '../master/models/companyFunction'
import { type LaborMarketFormValues } from '../master/models/laborMarket'

const sleep = async (delay: number) => {
  return await new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}
axios.defaults.baseURL = import.meta.env.VITE_REACT_API_URL

axios.interceptors.request.use(config => {
  const token = store.commonStore.token
  if (token && config.headers) (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`)
  return config
})

axios.interceptors.response.use(async response => {
  // if (process.env.NODE_ENV === 'development')
  // await sleep(1000)
  const pagination = response.headers.pagination
  if (pagination) {
    response.data = new PaginatedResult(response.data, JSON.parse(pagination))
    return response as AxiosResponse<PaginatedResult<any>>
  }

  return response
}, (error: AxiosError) => {
  const { status } = error.response as AxiosResponse
  switch (status) {
    case 400:
    //   if (config.method === 'get' && data.errors?.hasOwnProperty('id')) {
    //     router.navigate('/not-found')
    //   }
      break
    case 401:
      toast.error('unauthorized')
      break
    default:
      break
  }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data

const Account = {
  current: async () => await requests.get<User>('/account'),
  login: async (user: UserFormValues) => await requests.post<User>('/account/login', user)
  // register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const Permission = {
  permissions: async () => await requests.get<Permissions[]>('/permissions')
}

const CompanyService = {
  create: async (company: CompanyFormValues) => await requests.post('/companies', company),
  details: async (id: string) => await requests.get<Company>(`/companies/${id}`),
  current: async () => await requests.get<Company>('/companies'),
  list: async (params: URLSearchParams) => await axios.get<PaginatedResult<Company[]>>('companies/all', { params }).then(responseBody),
  createLaboraMarket: async (laboraMarket: LaborMarketFormValues) => await requests.post('laboraMarket', laboraMarket)
}

const Function = {
  list: async () => await requests.get<CompanyFunction[]>('/functions')
}

const requests = {
  // get: async <T> (url: string) => await axios.get<T>(url).then(responseBody),
  get: async<T> (url: string): Promise<T> => {
    try {
      const response = await axios.get<T>(url)
      return response.data
    } catch (error) {
      console.log('error: ', error)
      throw error
    }
  },
  post: async <T> (url: string, body: {}) => await axios.post<T>(url, body).then(responseBody)
  // put: async <T> (url: string, body: {}) => await axios.put<T>(url, body).then(responseBody),
  // del: async <T> (url: string) => await axios.delete<T>(url).then(responseBody)
}

const agent = {
  Account,
  Permission,
  CompanyService,
  Function,
  sleep
}

export default agent
