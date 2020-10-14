
let nextTodoId = 1
export const handleAddCount = (content) => {
  console.log(content)
  return {
    type: 'ADD',
    payload: {
      id: ++nextTodoId,
      count: content
    }
  }
}