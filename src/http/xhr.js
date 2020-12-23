import axios from 'axios'
import store from '@store'
import { globalConfig } from '../config'
import { getCurrentEnv } from '../utils'
import { message } from 'antd'  // message 待做防抖？
import loading from './loading'

const apiPre = globalConfig.host[getCurrentEnv()]
const xhr = axios.create({
  baseURL: apiPre,
  timeout: 30 * 1000,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache'
  }
})
// 请求拦截器
xhr.interceptors.request.use(
  (config) => {
    // loading start
    if (config.showLoading) {
      loading.start()
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// 响应拦截器
xhr.interceptors.response.use(
  (response) => {
    // loading end
    loading.end()
    let { data } = response
    if (data.code === 401) {  // 登录失效
      // 清空登录信息token和用户信息
      store.commit('CLEAN_LOGIN_USERINFO')
      message.warn('登录失效，3s后自动跳转到登录页')
      setTimeout(() => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/'
      }, 3000)
    } else if (data.code !== '1') {
      const errMessage = data.message || '接口错误'
      // 接口错误信息统一提示
      message.error(errMessage)
    }
    return data
  },
  (err) => {
    if (err.response) {

      message.error(err)
    }
    loading.end()
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

export const getData = function (url, data = {}, method = 'GET', showLoading = true, contentType = 'application/json;charset=UTF-8', baseURL, options) {
  // data = typeof data === 'string' ? JSON.parse(data) : data
  let config = {
    method: method.toUpperCase(),
    url,
    showLoading,
    cancelToken: cancelToken(),
    ...options
  }
  config.headers['Content-Type'] = contentType
  if (method === 'GET' || method === 'DELETE') {
    // get请求防止IE缓存
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      data.t = new Date().getTime()
    }
    config.params = data
  } else {
    config.data = data
  }
  return xhr(config)
}