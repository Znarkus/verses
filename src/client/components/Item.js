import React from 'react'

const Item = ({ item, outputItem, currentSlide }) => {
  const style = {
    backgroundColor: currentSlide === item.id && 'grey'
  }

  return (
    <li
      onClick={() => outputItem(item)}
      className={currentSlide === item.id ? 'active' : undefined}>
      {item.content}
    </li>
  )
}

export default Item
