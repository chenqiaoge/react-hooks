import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import store from '@/store' // store直接引用

import StoreCount from './hookStore'
import HomeClass from './home/homeClass.jsx'

import { handleAddCount } from '@store/actions/demo'

function Home(props) {
  console.log(props, store, store.getState().count)
  // console.log(props)
  const addCount = () => {
    const num = props.count + 1
    // console.log(num, props)
    props.handleAddCount(num)
  }
  return (
    <div className='Home'>
      Home
      <HomeClass />
      <div className='cont'>count:{props.count}</div>
      <Button type='primary' onClick={addCount}>
        add
      </Button>
      <StoreCount />
    </div>
  )
}
const mapStateToProps = (state) => ({ count: state.demo.count })
const mapDispatchToProps = (dispatch) => {
  return {
    handleAddCount: (val) => dispatch(handleAddCount(val)),
  }
}
// connect 方式使用store
export default connect(mapStateToProps, mapDispatchToProps)(Home)
