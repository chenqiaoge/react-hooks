import React, { useState, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import { Colors } from './Colors'
const style = {
  border: '1px solid gray',
  minHeight: '15rem',
  minWidth: '15rem',
  padding: '2rem',
  textAlign: 'center',
}
const TargetBox = ({ onDrop, lastDroppedColor, children }) => {
  const [hasDropped, setHasDropped] = useState(false)
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)
  const [{ isOver, isOverCurrent, draggingColor, canDrop }, drop] = useDrop({
    accept: [Colors.YELLOW, Colors.BLUE],
    drop(item, monitor) {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        console.log('didDrop')
        return
      }
      onDrop(item.type)
      setHasDropped(true)
      // return undefined
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      // canDrop: monitor.canDrop(),
      draggingColor: monitor.getItemType(),
    }),
  })
  const opacity = isOver ? 1 : 0.5
  console.log(isOver, isOverCurrent)
  let backgroundColor = ''
  // switch (draggingColor) {
  //   case Colors.BLUE:
  //     backgroundColor = 'lightblue'
  //     break
  //   case Colors.YELLOW:
  //     backgroundColor = 'lightgoldenrodyellow'
  //     break
  //   default:
  //     break
  // }
  backgroundColor = isOverCurrent ? 'red' : ''
  return (
    <div ref={drop} style={{ ...style, backgroundColor, opacity }}>
      <p>Drop here.{isOverCurrent ? 'cur' : ''}</p>
      {lastDroppedColor && hasDropped && <p>Last dropped: {lastDroppedColor}</p>}
      {children}
    </div>
  )
}
const StatefulTargetBox = ({ children, ...props }) => {
  const [lastDroppedColor, setLastDroppedColor] = useState(null)
  const handleDrop = useCallback((color) => setLastDroppedColor(color), [])
  return (
    <TargetBox {...props} lastDroppedColor={lastDroppedColor} onDrop={handleDrop}>
      {children}
    </TargetBox>
  )
}
export default StatefulTargetBox
