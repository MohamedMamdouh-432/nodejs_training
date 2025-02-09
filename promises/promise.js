const fs = require('fs')

// building promises
function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

// consuming promises

// method 1 : (then/catch)
readFilePromise('dog.txt')
    .then((data) => {
        const dogsList = data.toString().split('\n')
        for (let i = 0; i < dogsList.length; i++) {
            console.log(`Breed [${i + 1}]: ${dogsList[i]}`)
        }
    })
    .catch((err) => console.log(err))

// method 2 : (async/await)
(async function readFileAsyncAwait(filePath) {
    try {
        let res = await readFilePromise(filePath)
        console.log(res)
        return res
    } catch (err) {
        console.log(err.message)
        return err
    }
})()