import React, { useState, useCallback } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import store from '@/store' // store直接引用
import { handleAddCount } from '@/store/actions/demo'

function StoreCount(props) {
  console.log(props, store, store.getState().count)
  // console.log(props)
  const [pageState] = useState(1)
  // 获取store中state
  const hookCount = useSelector((state) => state.demo.count, shallowEqual)
  // store 的 dispatch
  const dispatch = useDispatch()
  const history = useHistory()
  const addCount = useCallback(() => {
    const num = hookCount + 1
    // console.log(num, props)
    dispatch(handleAddCount(num))
  }, [dispatch, hookCount])
  const handleGoLogin = useCallback(() => {
    history.push('/login')
  }, [history])
  return (
    <div className='Home'>
      <div className='cont'>
        pageState:{pageState},hookcount:{hookCount}
      </div>
      <span className='testJsx'>文件名jsx有提示</span>
      <button onClick={addCount}>add</button>
      <button onClick={handleGoLogin}>login</button>
    </div>
  )
}

// hooks 方式使用store
export default StoreCount
