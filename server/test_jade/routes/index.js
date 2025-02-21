const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Mohamed Mamdouh',
        content:
            'Hello Mohamed! We Happy to meet you here. We are a team of developers.',
    })
})

module.exports = router
