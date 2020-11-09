import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../ItemTypes'

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  // backgroundColor: 'white',
  cursor: 'move',
}
export const Card = ({ id, text, moveCard, findCard, index }) => {
  const ref = useRef(null)
  // drop
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    // hover(item, monitor) {
    //   // console.log(ref, ref.current)
    //   if (!ref.current) {
    //     return
    //   }
    //   const dragIndex = item.index
    //   const hoverIndex = index
    //   if (dragIndex === hoverIndex) {
    //     return
    //   }
    //   // ????,防止抖动，优化操作
    //   const hoverBoundingRect = ref.current?.getBoundingClientRect()
    //   const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    //   const clientOffset = monitor.getClientOffset()
    //   const hoverClientY = clientOffset.y - hoverBoundingRect.top
    //   if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //     // 从上到下
    //     console.log('--hoverBoundingRect:', hoverBoundingRect)
    //     return
    //   }
    //   if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //     // 从下到上
    //     console.log('---')
    //     return
    //   }
    //   moveCard(dragIndex, hoverIndex)
    //   item.index = hoverIndex
    // },
    drop() {
      console.log('drop')
    },
    hover({ id: draggedId, index: dragIndex }, monitor) {
      if (!ref.current) {
        return
      }
      if (draggedId !== id) {
        const { index: overIndex } = findCard(id)
        // ????,防止抖动，优化操作
        console.log('index:', dragIndex, overIndex)
        if (dragIndex === overIndex) {
          return
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        if (dragIndex < overIndex && hoverClientY < hoverMiddleY) {
          // 从上到下
          console.log('--hoverBoundingRect:', hoverBoundingRect)
          return
        }
        if (dragIndex > overIndex && hoverClientY > hoverMiddleY) {
          // 从下到上
          console.log('---')
          return
        }
        moveCard(draggedId, overIndex) // hover时，先移动顺序预览，最终位置跟结束释放的位置有关，可以回退一步
        dragIndex = overIndex // 防抖
      }
    },
  })
  // drag
  const originalIndex = findCard(id).index // 拖拽数据之前的原始顺序值
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      id,
      originalIndex,
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem()
      const didDrop = monitor.didDrop()
      if (!didDrop) {
        // dragEnd 拖拽结束，进行移动
        moveCard(droppedId, originalIndex)
      }
    },
  })
  const opacity = isDragging ? 0.5 : 1
  drag(drop(ref))
  return (
    <div ref={ref} style={{ ...style, opacity }}>
      {text}
    </div>
  )
}
