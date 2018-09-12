const key = '940571eab75e8eee5a8429da09b7f7b7e1733d414962114a918bdd6aa36d1f6f'
const proxy = 'ws://gateway.mauve.moe:3000'

const Websocket = require('websocket-stream/stream.js')
const hyperdrive = require('@jimpick/hyperdrive-next')
const ram = require('random-access-idb')(key)
const archive = hyperdrive(ram, key)

archive.once('ready', () => {
  const socket = Websocket(`${proxy}/${key}`)
  socket.pipe(archive.replicate()).pipe(socket)
  archive.readFile('/ryan.json', 'utf-8', function (err, data) {
    if (err) throw err
    console.log(data) // prints 'json' as a string
  })
})
