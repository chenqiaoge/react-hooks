import * as types from '@/store/action-types'

const initialState = {
  count: 10
}
// state仓库的值, action是传递的状态
export default function (state = initialState, action) {
  console.log('---reducer:', action, state)
  // if (action.type === 'persist/REHYDRATE') return state
  switch (action.type) {
    case types.ADD_COUNT: {
      return {
        ...state,
        count: action.payload.count
      }
    }

    default: {
      return state
    }
  }
}