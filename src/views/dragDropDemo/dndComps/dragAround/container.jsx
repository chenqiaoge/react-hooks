import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../ItemTypes'
import { Box } from './Box'
import update from 'immutability-helper'
import { BoxWithImage } from './BoxWithPreview'

const styles = {
  width: 500,
  height: 500,
  border: '1px solid black',
  position: 'relative',
}
export default function Container({ hideSourceOnDrag }) {
  const [boxes, setBoxes] = useState({
    a: { top: 40, left: 80, title: 'Drag me Around' },
    b: { top: 120, left: 20, title: 'Drag me too' },
  })
  const moveBox = (id, left, top) => {
    setBoxes(
      update(boxes, {
        [id]: {
          $merge: { left, top },
        },
      })
    )
  }
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      moveBox(item.id, left, top)
      return undefined
    },
    canDrop(item, monitor) {
      // 指定某些条件item不可放置
      // console.log('item', item)
      return true
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      // canDrop: monitor.canDrop(),
    }),
  })

  return (
    <div ref={drop} style={styles}>
      {/* <BoxWithImage /> */}
      {Object.keys(boxes).map((key) => {
        const { left, top, title } = boxes[key]
        return (
          <Box key={key} id={key} left={left} top={top} hideSourceOnDrag={hideSourceOnDrag}>
            {title}
          </Box>
        )
      })}
      {!isOver && <small>out of container</small>}
    </div>
  )
}
