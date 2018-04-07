import React, { Component } from 'react'
import openSocket from 'socket.io-client'

const socket = openSocket('/output')

class Output extends React.Component {
  componentDidMount () {
    socket.on('output', ({ item }) => {
      this.setState({ item })
    })
  }

  render () {
    return (
      <div id="output">
        {this.state && this.state.item &&
          <main id="content">
            {this.state.item.content}
          </main>
        }
      </div>
    )
  }
}

export default Output
