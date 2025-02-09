const fs = require('fs')
const superagent = require('superagent')

const getDogUrl = (breed) => `https://dog.ceo/api/breed/${breed}/images/random`

fs.readFile(`dog.txt`, (err, data) => {
    if (err) return console.log(err.message)
    console.log(`Breed: ${data}`)
    superagent
        .get(getDogUrl(data))
        .then((res) => console.log(res.body))
        .catch((err) => console.log(err.message))
})