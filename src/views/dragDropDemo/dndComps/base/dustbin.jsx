import React from 'react'
import { useDrop } from 'react-dnd'
// import { ItemTypes } from './ItemTypes'
import { debounce, throttle, customDebounce } from '@/utils'
// import {
//   // debounce,
//   // throttle,
// } from 'lodash'

const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}
function selectBackgroundColor(isActive, canDrop) {
  if (isActive) {
    return 'darkgreen'
  } else if (canDrop) {
    return 'darkkhaki'
  } else {
    return '#222'
  }
}

const testFunc = () => {
  console.log('throttle')
}
export const Dustbin = ({ accept, lastDroppedItem, onDrop }) => {
  console.log('dustbin')
  const [{ canDrop, isOver }, drop] = useDrop({
    accept,
    drop: onDrop,
    // drop: () => ({
    //   name: `${allowedDropEffect} Dustbin`,
    //   allowedDropEffect,
    // }),
    // hover: throttle(() => {
    //   console.log('hover')
    // }, 500),
    hover: () => {
      // console.log('hover')
      customDebounce(testFunc, 1000) // 自定义debounce可以，无闭包
      // debounce(function () {
      //   console.log('debounce1')
      //   return testFunc
      // }, 100)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = canDrop && isOver
  let backgroundColor = selectBackgroundColor(isActive, canDrop)
  const lastName = lastDroppedItem ? lastDroppedItem.name : ''
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {/* {`Works with ${allowedDropEffect} drop effect`}
      <br />
      <br /> */}
      {isActive ? 'Release to drop' : `this dustbins accept ${accept.join(', ')}`}
      <br />
      {canDrop ? 'yep' : 'nop'}
      {lastDroppedItem && <p>last dropped:{lastName}</p>}
    </div>
  )
}
