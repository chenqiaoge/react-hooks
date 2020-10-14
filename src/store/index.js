import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  count: 11
}

// state仓库的值, action是传递的状态
const reducer = (state = initialState, action) => {
  // console.log('---', action)
  switch (action.type) {
    case 'ADD': {
      // console.log('state:', state)
      return {
        ...state,
        count: action.payload.count
      }
    }
    default: return state
  }
}

// const store = createStore(reducer, 
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// chrome的devtools工具配置：
// 法1.window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// 法2.使用npm包（redux-devtools-extension）肿的composeWithDevTools()方法
const store = createStore(reducer,
  composeWithDevTools())

export default store