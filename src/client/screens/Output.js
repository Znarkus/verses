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

    socket.on('ftb', () => {
      this.setState(prevState => ({
        ftb: !prevState.ftb
      }))
    })
  }

  componentWillUnmount () {
    $('body').removeClass('output')
  }

  render () {
    if (!this.state) return

    const { item, ftb } = this.state

    return (
      <div id="output">
        {item &&
          <main id="content" className={`${ftb ? 'ftb' : ''}`}>
            {item.content}
          </main>
        }
      </div>
    )
  }
}

export default Output
