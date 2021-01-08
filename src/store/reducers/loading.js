import * as types from '@/store/action-types'

const initialState = {
  loading: false
}
export default function (state = initialState, action) {
  switch (action.type) {
    case types.SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }
    case types.STOP_LOADING: {
      return {
        ...state,
        loading: false
      }
    }
    default: {
      return state
    }
  }
}
