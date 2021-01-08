import React, {
  useState,
  // useCallback, useEffect
} from 'react'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Button } from 'antd'
// import update from 'immutability-helper' // 优化复杂state的更新

import BeauifulDnd from './beautiful'
import BeautiTwoDrag from './beautifuDnds/twoBox'
import BeautiDynamicDrag from './beautifuDnds/twoBox/dynamicDemo'

function DragDropComp() {
  // 当前展示dragDemo
  const [curDemoType, setCurDemoType] = useState('base')

  const handleDragType = (type) => {
    setCurDemoType(type)
  }
  return (
    <div className='dragWrap'>
      <div className='menuLists'>
        {/* <Button onClick={() => handleDragType('base')}>base</Button>
        <Button onClick={() => handleDragType('around')}>around</Button>
        <Button onClick={() => handleDragType('nest')}>nesting</Button>
        <Button onClick={() => handleDragType('sortable')}>sortable</Button> */}
        <Button onClick={() => handleDragType('beautiful')}>beautiful</Button>
        <Button onClick={() => handleDragType('beautiful-t')}>DragTwoBox</Button>
        <Button onClick={() => handleDragType('beautiful-dyna')}>beautiful-dyna</Button>
      </div>
      <div>
        {/* {curDemoType === 'base' && <BaseDrag />}
        {curDemoType === 'around' && <DragAround />}
        {curDemoType === 'nest' && <NestContainer />}
        {curDemoType === 'sortable' && <Sortable />} */}
        {curDemoType === 'beautiful' && <BeauifulDnd />}
        {curDemoType === 'beautiful-t' && <BeautiTwoDrag />}
        {curDemoType === 'beautiful-dyna' && <BeautiDynamicDrag />}
      </div>
      <div className='test2'>{/* <DragDropComp1 /> */}</div>
    </div>
  )
}

export default DragDropComp
