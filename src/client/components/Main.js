import React, { Component, Fragment } from 'react'
import Item from './Item'

class Main extends Component {
  ftb = () => {
    this.props.socket.emit('ftb')
  }

  render () {
    const { song, ...rest } = this.props

    return <Fragment>
      <main id="main">
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
      </main>
    </Fragment>
  }
)

export default Main
