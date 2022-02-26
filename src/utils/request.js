import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60 * 1000 * 5 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // token 这里加 从 cookie 里面读
    config.headers['token'] = getToken()
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    let res = null
    try {
      res = response.data
      if (Number(res.code) === 0) {
        return res
      } else {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(response)
      }
    } catch (e) {
      return Promise.reject(response)
    }
  },
  (error) => {
    // 接口报错统一弹框这里写
    return Promise.reject(error)
  }
)

export default service
