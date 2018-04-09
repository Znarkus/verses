'use strict'

const { resolve } = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const io = require('socket.io')
const send = require('koa-send')
const config = require('./config')

const app = new Koa()

const song = {
  title: 'Touch Of Heaven',
  artist: 'Hillsong',
  type: 'song',
  items: [
    {
      id: 3,
      group: 'verse',
      content: 'You have all my attention\n' +
      'I will linger and listen'
    },
    {
      id: 4,
      group: 'verse',
      content: 'I can’t miss a thing'
    },
    {
      id: 5,
      group: 'pre-chorus',
      content: 'Lord I know my heart\n' +
      'wants more of You'
    },
    {
      id: 6,
      group: 'pre-chorus',
      content: 'My heart wants\nsomething new'
    },
    {
      id: 7,
      group: 'pre-chorus',
      content: 'So I surrender all'
    },
  ]
}

let currentItem

app.use(serve(resolve(__dirname, '../dist')))

app.use(ctx => {
  return send(ctx, 'index.html', { root: resolve(__dirname, '../dist') })
})

const server = app.listen(config.port, started)

const wss = io(server)
const wssOutput = wss.of('/output')

function started () {
  console.log(`Serving on port ${config.port}`)

  wss.on('connection', (socket) => {
    console.log('Client connected')

    socket.emit('load', {
      song
    })

    socket.on('showItem', ({ item }) => {
      currentItem = item
      wssOutput.emit('output', { item: currentItem })
    })
  })

  wssOutput.on('connection', (socket) => {
    console.log('Client connected [OUTPUT]')

    socket.emit('output', { item: currentItem })
  })
}
