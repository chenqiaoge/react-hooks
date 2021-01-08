import * as types from '@/store/action-types'

let nextTodoId = 1
export const handleAddCount = (content) => {
  console.log(content)
  return {
    type: types.ADD_COUNT,
    payload: {
      id: ++nextTodoId,
      count: content
    }
  }
}