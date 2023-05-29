import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user-token'
const instance = axios.create({
  timeout: 1000 * 10,
})
// 请求拦截器
instance.interceptors.request.use(
  config => {
    const token = getToken()
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  error => Promise.reject(error)
)
// response 拦截 ：统一处理errno和msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData
  if (errno != 0) {
    if (msg) {
      message.error(msg)
      throw new Error(msg)
    } else {
      message.error('服务器错误')
      throw new Error('服务器错误')
    }
  }
  return data as any
})
export default instance
export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}
export type ResDataType = {
  [key: string]: any
}
