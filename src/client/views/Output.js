import React, { Component } from 'react'
import openSocket from 'socket.io-client'

const socket = openSocket('/output')

class Output extends Component {

  state = { item: null }

  componentDidMount () {
    socket.on('output', ({ item }) => {
      this.setState({ item })
    })
  }

  render () {
    const { item } = this.state
    return (
      <div id="output">
        {item &&
          <main id="content">
            {item.content}
          </main>
        }
      </div>
    )
  }
}

export default Output
