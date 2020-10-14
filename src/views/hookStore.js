import React from 'react';
import store from '../store'  // store直接引用
import { handleAddCount } from '../store/actions'


function StoreCount (props) {
  console.log(props, store, store.getState().count)
  // console.log(props)
  const addCount = () => {
    const num = props.count + 1
    // console.log(num, props)
    
  }
  return (
    <div className="Home">
      Home
      <div className="cont">
        count:{props.count}
      </div>
      <button onClick={addCount}>add</button>
    </div>
  )
}

// hooks 方式使用store
export default StoreCount