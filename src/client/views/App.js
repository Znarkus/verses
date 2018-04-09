import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Runsheet from '../components/Runsheet'
import Main from '../components/Main'
import openSocket from 'socket.io-client'

const socket = openSocket()

class App extends Component {

  state = {
    song: null,
    currentSlide: null
  }

  componentDidMount () {
    socket.on('load', ({ song }) => {
      this.setState({ song, currentSlide: null })
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

  componentWillMount () {
    socket.removeAllListeners('load')
  }

  goNextSlide = () => {
    const { song, currentSlide } = this.state

    if (!currentSlide) {
      // if we haven't started yet, here we could do some smooth animation
      this.outputItem(song.items[0])
      return
    }

    const currIndex = song.items
      .findIndex((item) => item.id === currentSlide)

    let nextSlide = song.items.slice(currIndex + 1)[0]

    if (!nextSlide) {
      nextSlide = song.items[0]
    }

    this.outputItem(nextSlide)
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

    this.outputItem(prevSlide)
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
