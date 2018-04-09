import React, { Fragment } from 'react'
import Item from './Item'

const Main = ({ song, ...rest }) => (
  <Fragment>
    {song &&
      <main id="main">
        <h2>{song.title}</h2>
        <ol>
          {song.items.map(item =>
            <Item
            item={item}
            key={item.id}
            {...rest} />
          )}
        </ol>
      </main>
    }
  </Fragment>
)

export default Main
