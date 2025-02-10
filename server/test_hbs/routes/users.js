var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send('respond with a resource')
})

router.get('/info/:id?', (req, res, next) => {
    res.render('info', {
        id: req.params.id,
    })
})

router.post('/info', (req, res, next) => {
    req.check('id', 'InValidId').not().isEmpty()
    const errors = req.validateErrors()
    if (errors) {
        console.log(errors)
        res.redirect('/')
    } else res.redirect('info/' + req.body.id)
})

module.exports = router
