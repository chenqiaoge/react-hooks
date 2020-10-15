import React, { useCallback } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import store from '../store' // store直接引用
import { handleAddCount } from '../store/actions'

function StoreCount(props) {
  console.log(props, store, store.getState().count)
  // console.log(props)
  // 获取store中state
  const hookCount = useSelector((state) => state.count, shallowEqual)
  // store 的 dispatch
  const dispatch = useDispatch()
  const addCount = useCallback(() => {
    const num = hookCount + 1
    // console.log(num, props)
    dispatch(handleAddCount(num))
  }, [dispatch, hookCount])
  return (
    <div className='Home'>
      <div className='cont'>hookcount:{hookCount}</div>
      <span className='testJsx'>文件名jsx有提示</span>
      <button onClick={addCount}>add</button>
    </div>
  )
}

// hooks 方式使用store
export default StoreCount
