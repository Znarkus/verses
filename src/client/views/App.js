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

    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case ' ':
          this.goNextSlide()
          break
        case 'ArrowRight':
          this.goNextSlide()
          break
        case 'ArrowDown':
          this.goNextSlide()
          break
        case 'ArrowLeft':
          this.goPrevSlide()
          break
        case 'ArrowUp':
          this.goPrevSlide()
          break
        default: false

      }
    })
  }

  goNextSlide = () => {
    const { song, currentSlide } = this.state

    if (!currentSlide) {
      socket.emit('showItem', { item: song.items[0] })
      this.setState({ currentSlide: song.items[0].id })
      return
    }

    const currIndex = song.items
      .findIndex((item) => item.id === currentSlide)

    let nextSlide = song.items.slice(currIndex + 1)[0]

    if (!nextSlide) {
      nextSlide = song.items[0]
    }

    socket.emit('showItem', { item: nextSlide })
    this.setState({ currentSlide: nextSlide.id })
  }

  goPrevSlide = () => {
    const { song, currentSlide } = this.state

    const currIndex = song.items
      .findIndex((item) => item.id === currentSlide)

    let prevSlide = song.items.slice(currIndex - 1)[0]

    if (!prevSlide) {
      // maybe black screen?
      return
    }

    socket.emit('showItem', { item: prevSlide })
    this.setState({ currentSlide: prevSlide.id })
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
