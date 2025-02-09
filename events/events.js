const EventEmitter = require('events')
const http = require('http')

class SalesEmitter extends EventEmitter {
  constructor() {
    super()
  }
}

const emitter = new SalesEmitter()

emitter.on('newSale', () => {
  console.log('There was a new sale!')
})

emitter.on('newSale', () => {
  console.log('Customer name: Mohamed')
})

emitter.on('newSale', (quantity) => {
  console.log(`Quantity Saled: ${quantity}`)
})

emitter.emit('newSale', 9)

////////////////////////////////////////////////

const server = http.createServer()

server.on('request', (req, res) => {
  console.log('Request Received')
  res.end('Request Received')
})

server.on('request', (req, res) => {
  console.log('Another Request 😎')
})

server.on('close', () => {
  console.log('Server Closed')
})

server.listen(3000, () => {
  console.log('Waiting for Request on host 3000...')
})
