import { createStore } from 'redux'

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

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store