import React, { useState } from 'react'
import { Button } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import './index.scss'

// data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item${k + offset}`,
  }))

// reorder,排序
const reorder = (boxData, startIndex, endIndex) => {
  const result = Array.from(boxData)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

// move list之间移动
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)
  destClone.splice(droppableDestination.index, 0, removed)
  const result = {}
  result[droppableSource.droppableId] = sourceClone // droppableId绑定的是index
  result[droppableDestination.droppableId] = destClone
  return result
}

const grid = 8
// --
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
})

// --box style
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
})

function DynamicDragDrop() {
  const [itemData, setItemData] = useState([getItems(10), getItems(5, 10)])

  function onDragEnd(result) {
    // 拖拽后数据处理
    console.log('dragEnd')
    const { source, destination } = result
    // dropped outside of the list
    if (!destination) {
      return
    }
    const sInd = +source.droppableId
    const dInd = +destination.droppableId
    if (sInd === dInd) {
      // 在一个list中排序
      const items = reorder(itemData[sInd], source.index, destination.index)
      const newState = [...itemData]
      newState[sInd] = items
      setItemData(newState)
    } else {
      // 在list之间穿梭
      const result = move(itemData[sInd], itemData[dInd], source, destination)
      const newState = [...itemData]
      newState[sInd] = result[sInd]
      newState[dInd] = result[dInd]
      setItemData(newState.filter((group) => group.length))
    }
  }
  // drag Item renderFunction
  function renderDragItems(boxItem, ind) {
    const delItem = (ind, index) => {
      const newState = [...itemData]
      newState[ind].splice(index, 1)
      setItemData(newState.filter((group) => group.length))
    }
    return (
      boxItem &&
      boxItem.length >= 0 &&
      boxItem.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
              <div className='dragItem'>
                {item.content}
                <button onClick={() => delItem(ind, index)}>del</button>
              </div>
            </div>
          )}
        </Draggable>
      ))
    )
  }
  return (
    <div className='dynamic'>
      <Button onClick={() => setItemData([...itemData, []])}>Add new Group</Button>
      <Button onClick={() => setItemData([...itemData, getItems(2)])}>Add new Item</Button>
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {itemData.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}>
                  <div className='title'>组title{ind}</div>
                  {renderDragItems(el, ind)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  )
}

export default DynamicDragDrop
