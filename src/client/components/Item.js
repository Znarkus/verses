import React from 'react'

const Item = ({ item, outputItem, currentSlide }) => {
  const activeBackground = {
    backgroundColor: currentSlide === item.id && 'grey'
  }

  return (
    <li
      onClick={() => outputItem(item)}
      style={activeBackground}>
      {item.content}
    </li>
  )
}

export default Item
