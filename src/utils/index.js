import { globalConfig } from '@/config'
/**
 * 根据页面url，返回当前运行的环境是：test || uat || pre || prod
 * @returns {string}
 */
export const getCurrentEnv = function () {
  let { hostname } = window.location
  if (hostname.includes('192.168') || hostname.includes('172.16') || hostname.includes('10.105') || hostname.includes('localhost')) {
    return globalConfig.mock
  }
  let reg = /([^.]+)\./
  let prefix = reg.exec(hostname)[1]
  let envArr = ['test', 'uat', 'pre']
  if (envArr.includes(prefix)) {
    return prefix
  } else {
    return 'prod'
  }
}