import React, { Component } from 'react'

class Ftb extends Component {
  go = () => {
    this.props.socket.emit('ftb')
  }

  render () {
    return <div onClick={this.go}>
      Fade to black
    </div>
  }
}

export default Ftb
