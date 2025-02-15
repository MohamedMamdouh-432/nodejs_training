var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Express',
        success: req.session.success,
        errors: req.session.errors,
    })
})

router.get('/person', (req, res, next) => {
    res.render('person')
})

module.exports = router
