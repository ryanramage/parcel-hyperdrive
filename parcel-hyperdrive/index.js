
const key = 'c74f8ceb1d5e50478ca0b71b2a65f60a20e383bd220519055facb5da93cbd5c6'
const Websocket = require('websocket-stream/stream.js')
const hyperdrive = require('hyperdrive')
const ram = require('random-access-idb')(key)

const url = `ws://50.65.72.243:3000/${key}`
const archive = hyperdrive(ram, key)
archive.once('ready',  () => {
  const socket = Websocket(url)
  let rstream = archive.replicate()
  rstream.on('finish', () => { console.log('replication complete')  })
  socket.pipe(rstream).pipe(socket)
  console.log(archive)
  const h = archive.history({tail: true, live: true})
  h.on('data', (d) => { console.log('data:', d)  })

  archive.readdir('/', function (err, list) {
    if (err) throw err
    console.log(list)
    //setInterval(() => {
    //    archive.readFile('/people/ryan.json', 'utf-8', function (err, data) {
    //        if (err) throw err
    //        console.log(data) // prints 'world'
    //    })
    // }, 2000)
  })
})

