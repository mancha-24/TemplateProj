import axios, { type AxiosResponse, type AxiosError, type AxiosHeaders } from 'axios'
import { type User, type UserFormValues } from '../master/models/user'
import { toast } from 'react-toastify'
import { store } from '../stores/store'
import { type Permissions } from '../master/models/permissions'
import { type CompanyFormValues } from '../master/models/company'

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
  await sleep(1000)
  //   const pagination = response.headers['pagination']
  //   if (pagination) {

  //   }
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

const Company = {
  create: async (company: CompanyFormValues) => await requests.post('/companies', company)
}

const requests = {
  get: async <T> (url: string) => await axios.get<T>(url).then(responseBody),
  post: async <T> (url: string, body: {}) => await axios.post<T>(url, body).then(responseBody)
  // put: async <T> (url: string, body: {}) => await axios.put<T>(url, body).then(responseBody),
  // del: async <T> (url: string) => await axios.delete<T>(url).then(responseBody)
}

const agent = {
  Account,
  Permission,
  Company
}

export default agent
