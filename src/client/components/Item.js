import React from 'react'

const Item = ({ item, outputItem, currentSlide }) => (
  <li
    onClick={() => outputItem(item)}
    className={currentSlide === item.id ? 'active' : undefined}>
    {item.content}
  </li>
)

export default Item
