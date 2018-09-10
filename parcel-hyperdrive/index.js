const Websocket = require('websocket-stream/stream.js')
const hyperdrive = require('hyperdrive')
const ram = require('random-access-idb')('dbname')
const key = 'ac3ca99b5e554d72e38e4daf6a792fa71a4e959554fba2063b96b7e9ccaa21cf'
const url = `ws://50.65.72.243:3000/${key}`
const archive = hyperdrive(ram, key)
archive.once('ready',  () => {
  const socket = Websocket(url)
  let rstream = archive.replicate()
  rstream.on('finish', () => { console.log('replication complete')  })
  socket.pipe(rstream).pipe(socket)
  archive.readdir('/', function (err, list) {
    if (err) throw err
    console.log(list)
    archive.readFile('/dat.json', 'utf-8', function (err, data) {
      if (err) throw err
      console.log(data) // prints 'world'
    })
  })
})

