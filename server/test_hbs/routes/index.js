var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express',
        condition: true,
        arr: ["Hi", "Bye", "Good", "Bad"],
    })
})

router.get('/person', (req, res, next) => {
    res.render('person')
})

module.exports = router
