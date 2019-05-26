'use strict'

import React, { Component, Fragment } from 'react'
import Item from './Item'

class Deck extends Component {
  ftb = () => {
    this.props.socket.emit('ftb')
  }

  render() {
    const { song, ...rest } = this.props

    return <Fragment>
        <div onClick={this.ftb}>
          Fade to black
        </div>

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
    </Fragment>
  }
}

export default Deck
