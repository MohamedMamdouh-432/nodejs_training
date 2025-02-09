var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express',
        condition: true,
        array: [1, 2, 3, 4],
    })
})

module.exports = router
