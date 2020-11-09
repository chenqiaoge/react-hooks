import React from 'react'
import { useDrag, DragPreviewImage } from 'react-dnd'
import { ItemTypes } from '../ItemTypes'
import { boxImage } from './boxImage'

const styles = {
  position: 'absolute',
  border: '1px dashed gray',
  // backgroundColor: 'white',
  padding: '10px',
  cursor: 'move',
}
export const Box = ({ id, left, top, hideSourceOnDrag, children }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { id, left, top, type: ItemTypes.BOX }, // 定义item，drop会接收
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag}></div>
  }

  return (
    <>
      <DragPreviewImage connect={preview} src={boxImage} />
      <div ref={drag} style={{ ...styles, left, top }} className='box'>
        {children}
      </div>
    </>
  )
}
