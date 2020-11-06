import React, { useState, useCallback, useEffect } from 'react'
// import ReactDOM from 'react-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import update from 'immutability-helper' // 优化复杂state的更新
import shuffle from 'lodash/shuffle'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Dustbin } from './dndComps/base/dustbin'
import { Box } from './dndComps/base/boxItem'
import { ItemTypes } from './dndComps/ItemTypes'

function DragDropComp() {
  // accepts 定义可以放置的类型，
  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    { accepts: [ItemTypes.PAPER, ItemTypes.GLASS], lastDroppedItem: null },
    { accepts: [ItemTypes.PAPER], lastDroppedItem: null },
  ])
  const [boxes, setBoxes] = useState([
    { name: 'Bottle -glass', type: ItemTypes.GLASS },
    { name: 'Bnana', type: ItemTypes.FOOD },
    { name: 'Magazine -paper', type: ItemTypes.PAPER },
  ])
  const [droppedBoxNames, setDroppedBoxNames] = useState([])
  // 定时模拟修改数据
  useEffect(() => {
    setTimeout(() => {
      setBoxes(shuffle(boxes))
      setDustbins(shuffle(dustbins))
      console.log('change data')
    }, 2000)
    // return () => clearInterval(interval)
  }, [])
  // 是否已放置过
  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1
  }
  const handleDrop = useCallback(
    (item, index) => {
      const { name } = item
      setDroppedBoxNames([...droppedBoxNames, name])
      // 数据更新待优化
      const copyData = [...dustbins]
      copyData[index].lastDroppedItem = item
      setDustbins(copyData)
    },
    [droppedBoxNames, dustbins]
  )
  return (
    <div className='dragWrap'>
      1112
      <DndProvider backend={HTML5Backend}>
        <div className='test'>
          <div className='dustbin'>
            {/* <Dustbin allowedDropEffect='any' />
            <Dustbin allowedDropEffect='copy' />
            <Dustbin allowedDropEffect='move' /> */}
            {dustbins.map(({ accepts, lastDroppedItem }, index) => (
              <Dustbin
                key={index}
                accept={accepts}
                lastDroppedItem={lastDroppedItem}
                onDrop={(item) => handleDrop(item, index)}
              />
            ))}
          </div>
          <div className='rubish'>
            {/* <Box name='rbs1'>rbs1</Box>
            <Box name='rbs2'>rbs2</Box>
            <Box name='rbs3'>rbs3</Box> */}
            {boxes.map(({ name, type }, index) => (
              <Box key={index} name={name} type={type} isDropped={isDropped(name)} />
            ))}
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
