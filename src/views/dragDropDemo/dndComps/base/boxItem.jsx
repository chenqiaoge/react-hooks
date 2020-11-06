import React from 'react'
import { useDrag } from 'react-dnd'
// import { ItemTypes } from './ItemTypes'
const style = {
  border: '1px dashed gray',
  // backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}
export const Box = ({ name, type, isDropped }) => {
  const [{ isDragging }, drag, previewDrag] = useDrag({
    item: { name, type },
    // end: (item, monitor) => {
    //   const dropResult = monitor.getDropResult()
    //   console.log(item, dropResult)
    //   if (item && dropResult) {
    //     console.log('--', dropResult.dropEffect)
    //     let alertMessage = ''
    //     const isDropAllowed =
    //       dropResult.allowedDropEffect === 'any' ||
    //       dropResult.allowedDropEffect === dropResult.dropEffect
    //     if (isDropAllowed) {
    //       const isCopyAction = dropResult.dropEffect === 'copy'
    //       const actionName = isCopyAction ? 'copied' : 'moved'
    //       alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`
    //     } else {
    //       alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}`
    //     }
    //     alert(alertMessage)
    //   }
    // },
    begin: () => {
      console.log('begin')
    },
    // canDrag(){

    // },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0.4 : 1
  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {isDropped ? <s>{name}</s> : name}
      {/* <div ref={previewDrag} style={{ ...style, opacity}}></div> */}
    </div>
  )
}
