'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import openSocket from 'socket.io-client'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Output } from './output'

const socket = openSocket()

class Runsheet extends React.Component {
  render () {
    return <h2>Runsheet</h2>
  }
}

class Item extends React.Component {
  onClick () {
    socket.emit('showItem', { item: this.props.item })
  }

  render () {
    const item = this.props.item

    return <li onClick={e => this.onClick(e)}>
      {item.content}
    </li>
  }
}

class Main extends React.Component {
  render () {
    const song = this.props.song
    const items = song.items.map(item =>
      <Item item={item} key={item.id}/>
    )

    return <div id={song.type}>
      <h2>{song.title}</h2>
      <ol>
        {items}
      </ol>
    </div>
  }
}

class App extends React.Component {
  componentDidMount () {
    socket.on('load', ({ song }) => {
      this.setState({ song })
    })
  }

  render () {
    return <div id="app">
      <nav id="nav">
        <Link to="/output">Output</Link>
      </nav>
      <aside id="aside">
        <Runsheet/>
      </aside>
      <main id="main">
        {this.state && this.state.song &&
          <Main song={this.state.song} />
        }
      </main>
    </div>
  }
}

ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/output" component={Output}/>
    </div>
  </Router>
), document.getElementById('mount'))
