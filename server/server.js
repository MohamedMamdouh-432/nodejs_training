const express = require('express')

const app = express()
const port = process.env.PORT || 4320

app.use(express.json())

app.get('', (_, res) => {
  res.redirect('./public/html/index.html')
})

app.get('*', (_, res) => {
  res.send({ message: '404 Not Found' })
})

app.listen(port, () => {
  console.log(`Express Server listening on localhost:${port}`)
})
