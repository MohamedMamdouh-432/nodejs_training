const { check, validationResult } = require('express-validator')
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('respond with a resource')
})

router.get('/info/', (req, res, next) => {
    res.render('info', {
        name: req.query.name,
        phone: req.query.phone,
    })
})

router.post(
    '/info',
    [
        check('name', 'Name is not valid').notEmpty(),
        check('phone')
            .notEmpty()
            .withMessage('Phone is not valid')
            .isMobilePhone('ar-EG')
            .withMessage('Not an Egyptian Phone'),
    ],
    (req, res, next) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            console.log(result.errors)
            req.session.success = false
            req.session.errors = result.errors
            res.redirect('/')
        } else {
            const { name, phone } = req.body
            req.session.success = true
            req.session.errors = null
            res.redirect('info?name=' + name + '&phone=' + phone)
        }
    }
)

module.exports = router
