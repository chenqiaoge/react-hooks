import axios from 'axios'
import { getCurrentEnv } from '../utils'


const xhr = axios.create()

xhr.interceptors.request.use(
  (config) => {
    let reqData = {}
    // loading start
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

xhr.interceptors.response.use(
  (response) => {
    // loading end

    return response.data
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 切换页面时候,取消上个页面的请求的方法

globalConfig.$httpRequestList = []

const cancelToken = () => {
  return new axios.CancelToken(cancel => {
    // cancel就是取消请求的方法
    globalConfig.$httpRequestList.push({
      cancel
    })
  })
}

export const getData = function (url, data, method = 'GET', showLoading = true, contentType = 'application/json;charset=UTF-8') {
  data = data ? data : {}
  url = globalConfig.host[getCurrentEnv()] + url
  data = typeof data === 'string' ? JSON.parse(data) : data
  let config = {
    method: method.toLowerCase(),
    url,
    withCredentials: true,
    data: contentType === 'multipart/form-data' ? data : { ...data, showLoading },
    headers: {
      'Content-Type': contentType
    },
    cancelToken: cancelToken()
  }
  if (method.toUpperCase() === 'GET') {
    config.params = data
  }
  config.timeout = 10 * 1000
  return xhr(config)
}