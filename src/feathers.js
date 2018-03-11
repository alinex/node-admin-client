// import vueFeathers from 'vue-feathers'

import feathers, { authentication, socketio } from '@feathersjs/client'
import io from 'socket.io-client'

const socket = io(process.env.API, {transports: ['websocket']})
// on reconnection, reset the transports option, as the Websocket
// connection may have failed (caused by proxy, firewall, browser, ...)
socket.on('reconnect_attempt', () => {
  socket.io.opts.transports = ['polling', 'websocket']
})

const feathersClient = feathers()
  .configure(socketio(socket, {
    timeout: 2000
  })) // you could use Primus or REST instead
  .configure(authentication({ storage: window.localStorage }))

socket.on('reconnect', () => { feathersClient.authenticate() })

export default feathersClient
