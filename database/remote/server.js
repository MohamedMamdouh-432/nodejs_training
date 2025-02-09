const { url } = require('./dbconfig')
const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient, ObjectId } = require('mongodb')

const app = express()
app.use(bodyParser.json())

const dbOps = async () => {
  const client = await MongoClient.connect(url)
  console.log('Connected')
  const friendsCol = client.db('people').collection('friends')
  app
    .route('/users')
    .get((_, response) => {
      friendsCol
        .find()
        .toArray()
        .then((results) => {
          console.log(results)
          response.contentType('application/json')
          response.send(JSON.stringify(results))
        })
    })
    .post((request, response) => {
      friendsCol.insertOne(request.body).then((results) => {
        console.log(results)
        response.contentType('application/json')
        response.send(JSON.stringify(results))
      })
    })
    .put((request, response) => {
      friendsCol
        .findOneAndUpdate(
          { _id: new ObjectId(request.body._id) },
          {
            $set: {
              name: request.body.name,
              age: request.body.age,
            },
          },
          { upsert: false }
        )
        .then((_) => {
          response.contentType('application/json')
          response.send(JSON.stringify({ status: true }))
        })
    })
  app.route('/users/:name').get((request, response) => {
    friendsCol
      .find({ name: request.params.name })
      .toArray()
      .then((results) => {
        console.log(results)
        response.contentType('application/json')
        response.send(JSON.stringify(results))
      })
  })
  app.route('/users/:id').delete((request, response) => {
    friendsCol
      .deleteOne({ _id: new ObjectId(request.params.id) })
      .then((result) => {
        response.contentType('application/json')
        let deleteStatus = result.deletedCount > 0
        response.send(JSON.stringify({ status: deleteStatus })).catch((err) => {
          response.contentType('application/json')
          response.send(JSON.stringify({ status: false }))
        })
      })
  })
}

dbOps()

app
  .get('/', (_, res) => res.sendFile(`${__dirname}/index.html`))
  .listen(4320, () => console.log('Server listening on localhost:4320'))
