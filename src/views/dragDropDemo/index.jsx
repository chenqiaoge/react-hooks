import React from 'react'
// import ReactDOM from 'react-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Dustbin } from './dndComps/dustbin'
import { Box } from './dndComps/boxItem'

function DragDropComp() {
  return (
    <div className='dragWrap'>
      1112
      <DndProvider backend={HTML5Backend}>
        <div className='test'>
          <div className='dustbin'>
            <Dustbin />
          </div>
          <div className='rubish'>
            <Box name='rbs1'>rbs1</Box>
            <Box name='rbs2'>rbs2</Box>
            <Box name='rbs3'>rbs3</Box>
          </div>
        </div>
      </DndProvider>
      <div className='test2'>{/* <DragDropComp1 /> */}</div>
    </div>
  )
}
class DragDropComp1 extends React.Component {
  // onDragStart = () => {}
  // onDragEnd = () => {}
  render() {
    return (
      <div className='dragWrap'>
        111
        <DragDropContext>
          <Droppable>
            <div className='drops'>
              <p>drop</p>
              <Draggable>
                <div className='dragItem'>111</div>
              </Draggable>
            </div>
          </Droppable>
        </DragDropContext>
      </div>
    )
  }
}
export default DragDropComp
