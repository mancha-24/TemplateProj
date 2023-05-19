import axios, { type AxiosResponse, type AxiosError } from 'axios'
import { type User, type UserFormValues } from '../master/models/user'

const sleep = async (delay: number) => {
  return await new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

axios.defaults.baseURL = 'http://localhost:5001/api'

axios.interceptors.response.use(async response => {
  if (process.env.NODE_ENV === 'development') await sleep(1000)

  //   const pagination = response.headers['pagination']
  //   if (pagination) {

  //   }
  return response
}, (error: AxiosError) => {
  const { data, status, config } = error.response as AxiosResponse
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
  // current: () => requests.get<User>('/account'),
  login: async (user: UserFormValues) => await requests.post<User>('/account/login', user)
  // register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const requests = {
  // get: async <T> (url: string) => await axios.get<T>(url).then(responseBody),
  post: async <T> (url: string, body: {}) => await axios.post<T>(url, body).then(responseBody)
  // put: async <T> (url: string, body: {}) => await axios.put<T>(url, body).then(responseBody),
  // del: async <T> (url: string) => await axios.delete<T>(url).then(responseBody)
}

const agent = {
  Account
}

export default agent