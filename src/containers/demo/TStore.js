//  this is simple redux of heny
export function createStore (reducer, enhance) {
  if (enhance) {
    // 第二个参数为第二次的createStore传入的参数
    return enhance(createStore)(reducer)
  }
  let currentStore;
  let currentHandle = []

  function getState () {
    return currentStore
  }

  function dispatch (action) {
    currentStore = reducer(currentStore, action)
    currentHandle.forEach(v => v())
    return action
  }

  function subscribe (fn) {
    currentHandle.push(fn)
  }

  // 初始化dispatch
  dispatch({ type: '@IMOOC/HNY-REDUX' })

  return {
    getState, dispatch, subscribe
  }
}

export function appMiddleWare (...middleWares) {
  // 和上面调用的是一样的， 第一个是强化的createStore，第二个参数是创建createStore的参数；
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch
    const middleApi = {
      getState: store.getState,
      dispatch
    }
    // 将中间件执行，并返回新的函数；
    const middleWareChain = middleWares.map(middleWare => middleWare(middleApi))

    // 将函数整合，合并成一个函数，并依次传入第一个参数dispatch
    dispatch = compose(...middleWareChain)(dispatch)

    // 返回创建的createStore的结果, 并强化dispatch
    return {
      ...store,
      dispatch
    }
  }
}

const compose = (...funcs) => {
  if (funcs.length === 0) {
    return args => args
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  // args接收的是函数执行转换完成的第二个参数
  return funcs.reduce((left, right) => (...args) => right(left(...args)))
}