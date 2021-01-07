import { globalConfig } from '@/config'
import { message } from 'antd'
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

/**
 * 消息节流，代理message对象
 */
export const messageTip = new Proxy(function () { }, {
  get (target, property, receiver) {
    let _this = this;
    return function (msg) {
      _this.apply(target, _this, [msg, property]);
    };
  },
  apply (target, thisBing, [msg, status]) {
    sessionStorage["flag"] = sessionStorage["flag"] || "true";
    if (sessionStorage["flag"] === "false") return;
    sessionStorage["flag"] = "false";
    message[status || "success"](msg);
    setTimeout(_ => {
      sessionStorage["flag"] = "true";
      delete sessionStorage["flag"];
    }, 1500);
  }
});

/**
 * 防抖函数--？？？
 * @param {func} 待执行的函数体
 * @param {wait} 控制节流时间
 */
let timeout
export function debounce (func, wait = 300) {
  console.log('wai')
  return function () {
    let context = this
    let arg = arguments
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func.apply(context, arg)
      console.log('nei')
    }, wait)
  }
}
/**
 * 自定义防抖函数
 * @param {*} fn 
 * @param {*} delay 
 */
export function customDebounce (method, context) {
  clearTimeout(method.timeout)
  method.timeout = setTimeout(function () {
    method.call(context)
  }, 500)
}

export function throttle (fn, delay) {
  let valid = true
  console.log('wai')
  return function () {
    if (!valid) {
      //休息时间 暂不接客
      return false
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false
    setTimeout(() => {
      fn()
      console.log('nei')
      valid = true;
    }, delay)
  }
}

export function flatChildren (target = [], origin) {
  origin.forEach((item) => {
    // console.log(item)
    const { children, ...self } = item
    target.push(self)
    if (children?.length > 0) {
      flatChildren(target, children)
    }
  })
}