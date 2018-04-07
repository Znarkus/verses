import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Runsheet from '../components/Runsheet'
import Main from '../components/Main'

import openSocket from 'socket.io-client'
const socket = openSocket()

class App extends Component {
  constructor () {
    super()
    this.state = {
      song: null,
      currentSlide: null
    }
  }

  componentDidMount () {
    socket.on('load', ({ song }) => {
      this.setState({ song })
    })
  }

  outputItem = (item) => {
    socket.emit('showItem', { item })
    this.setState({ currentSlide: item.id })
  }

  render () {
    const { song, currentSlide } = this.state
    return (
      <div id="app">
        <nav id="nav">
          <Link to="/output">Output</Link>
        </nav>
        <aside id="aside">
          <Runsheet/>
        </aside>
        <Main
          song={song}
          currentSlide={currentSlide}
          outputItem={this.outputItem} />
      </div>
    )
  }
}

export default App
