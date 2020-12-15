import React, { useState, useCallback } from 'react'
// import ReactDOM from 'react-dom'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Container from './dragAround/container'

const DragAround = () => {
  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  const toggle = useCallback(() => {
    setHideSourceOnDrag(!hideSourceOnDrag)
  }, [hideSourceOnDrag])
  return (
    <div className='around'>
      <Container hideSourceOnDrag={hideSourceOnDrag} />
      <p>
        <label htmlFor='hideSourceOnDrag'>
          <input
            type='checkbox'
            id='hideSourceOnDrag'
            checked={hideSourceOnDrag}
            onChange={toggle}
          />
          <small>Hide the source item while dragging</small>
        </label>
      </p>
    </div>
  )
}
export default DragAround
