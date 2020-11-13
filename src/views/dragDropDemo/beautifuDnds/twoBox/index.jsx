import React, { useState, useCallback, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import './index.scss'

/**
 * 生产数据mock
 * @param {*} count
 * @param {*} offset
 */
const getItems = (count, offset = 0) => {
  return Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item${k + offset}`,
  }))
}

const grid = 8
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
  display: 'inline-block',
})

const getItemStyle = (isDragging, draggableStyle) => ({
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
})

/**
 * 数据（list）顺序调整（移动），
 * @param {*} list 数据
 * @param {*} startIndex  开始位置
 * @param {*} endIndex 目标位置
 */
const recorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

function DragTwoBox(props) {
  const [items, setItems] = useState(getItems(10))
  const [selected, setSelected] = useState(getItems(3, 10))
  const [dropOneDisable, setDropOneDisable] = useState(false)
  const move = useCallback((sourceData, targetData, source, destination) => {
    const sourceClone = Array.from(sourceData)
    const targetClone = Array.from(targetData)
    let removed
    // if (destination.droppableId === 'items') {
    //   console.log('to items', source)
    //   removed = sourceClone[source.index] // get removedData it from source
    // } else {
    removed = sourceClone.splice(source.index, 1)[0] // remove it from source
    targetClone.splice(destination.index, 0, removed) // add it in target
    // }
    return { sourceClone, targetClone }
  }, [])
  const onDragEnd = useCallback(
    (result) => {
      // nothing to do ,也可以改变数据拖拽？？？
      const { source, destination } = result
      if (!destination) {
        // dropped outside the list
        return
      }
      if (source.droppableId === destination.droppableId) {
        // 在一个盒子内
        console.log('in one')
        let curListData = items
        if (source.droppableId === 'items') {
          const targetData = recorder(curListData, source.index, destination.index)
          setItems(targetData)
        } else if (source.droppableId === 'selected') {
          curListData = selected
          const targetData = recorder(curListData, source.index, destination.index)
          setSelected(targetData)
        }
      } else {
        // 两个盒子之间穿梭
        console.log(source, destination)
        const sourceData = source.droppableId === 'items' ? items : selected
        const targetData = destination.droppableId === 'items' ? items : selected
        const result = move(sourceData, targetData, source, destination)
        console.log('result', result)
        source.droppableId === 'items'
          ? setItems(result.sourceClone)
          : setSelected(result.sourceClone)
        destination.droppableId === 'items'
          ? setItems(result.targetClone)
          : setSelected(result.targetClone)
      }
    },
    [items, selected, move]
  )
  const onBeforeCapture = (prop) => {
    console.log('beforeCapture:', prop)
  }
  const onDragUpdate = (prop) => {
    console.log('onDragUpdate:', prop)
    if (prop.source.droppableId === 'selected') {
      setDropOneDisable(true)
    } else {
      setDropOneDisable(false)
    }
  }
  const renderItems = useCallback(
    (itemList) =>
      itemList.map((item, index) => (
        <Draggable
          key={item.id}
          draggableId={item.id}
          isDragDisabled={item.id === 'item-11'}
          index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
              {item.content}
            </div>
          )}
        </Draggable>
      )),
    []
  )
  return (
    <div className='beautifulDndDemo'>
      <h3>beautiful-dnd</h3>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragUpdate={onDragUpdate}
        onBeforeCapture={onBeforeCapture}>
        <Droppable droppableId='items' isDropDisabled={dropOneDisable}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {renderItems(items)}
              {provided.placeholder}
              {/* provided.placeholder 不可省略 */}
            </div>
          )}
        </Droppable>
        <Droppable droppableId='selected'>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className='rightBox'
              style={getListStyle(snapshot.isDraggingOver)}>
              {renderItems(selected)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default DragTwoBox
