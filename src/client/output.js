'use strict'

import React from 'react'
import openSocket from 'socket.io-client'

const socket = openSocket('/output')

class Content extends React.Component {
  render () {
    const item = this.props.item

    return <main id="content">
      {item.content}
    </main>
  }
}

export class Output extends React.Component {
  componentDidMount () {
    socket.on('output', ({ item }) => {
      this.setState({ item })
    })
  }

  render () {
    return <div id="output">
      {this.state && this.state.item &&
      <Content item={this.state.item} />
      }
    </div>
  }
}
