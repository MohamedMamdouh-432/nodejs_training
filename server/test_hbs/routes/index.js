var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
    res.render('index', {
        author: 'Mohamed Mamdouh',
        title: 'Express',
        condition: true,
    })
})

router.get('/person', (req, res, next) => {
    res.render('person')
})

module.exports = router
