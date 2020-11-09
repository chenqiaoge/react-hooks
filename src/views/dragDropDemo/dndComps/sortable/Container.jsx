import React, { useState, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import { Card } from './Card'
import { ItemTypes } from '../ItemTypes'

const style = {
  width: 400,
}
const Container = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: 'Write a cool JS library',
    },
    {
      id: 2,
      text: 'Make it generic enough',
    },
    {
      id: 3,
      text: 'Write README',
    },
    {
      id: 4,
      text: 'Create some examples',
    },
    {
      id: 5,
      text:
        'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
    },
    {
      id: 6,
      text: '???',
    },
    {
      id: 7,
      text: 'PROFIT',
    },
  ])

  // const moveCard = useCallback(
  //   (dragIndex, hoverIndex) => {
  //     const dragCard = cards[dragIndex]
  //     setCards(
  //       update(cards, {
  //         $splice: [
  //           [dragIndex, 1],
  //           [hoverIndex, 0, dragCard],
  //         ],
  //       })
  //     )
  //   },
  //   [cards]
  // )

  const moveCard = (id, atIndex) => {
    const { card, index } = findCard(id)
    setCards(
      update(cards, {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      })
    )
  }
  // add 结束拖拽时，超出区域，要复原到初始位置
  const findCard = (id) => {
    const card = cards.filter((c) => c.id === id)[0]
    return {
      card,
      index: cards.indexOf(card),
    }
  }
  const [, drop] = useDrop({ accept: ItemTypes.CARD })

  const renderCard = (card, index) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
        findCard={findCard}></Card>
    )
  }
  return (
    <>
      <div ref={drop} style={style}>
        {cards.map((card, i) => renderCard(card, i))}
      </div>
    </>
  )
}
export default Container
