import React, { Component } from 'react'
import openSocket from 'socket.io-client'
import $ from 'jquery'

const socket = openSocket('/output')

class Output extends Component {

  state = { item: null }

  componentDidMount () {
    $('body').addClass('output')

    socket.on('output', ({ item }) => {
      this.setState({ item })
    })
  }

  componentWillUnmount () {
    $('body').removeClass('output')
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
