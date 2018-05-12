import React, { Fragment } from 'react'
import Item from './Item'
import Ftb from './Ftb'

const Main = ({ song, socket, ...rest }) => (
  <Fragment>
    <main id="main">
      <Ftb socket={socket} />

      {song &&
        <section className="content">
        <h2>{song.title}</h2>
        <ol>
          {song.items.map(item =>
            <Item
            item={item}
            key={item.id}
            {...rest} />
          )}
        </ol>
        </section>
      }
    </main>
  </Fragment>
)

export default Main
