const { check, validationResult } = require('express-validator')
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('respond with a resource')
})

router.get('/info/:id?', (req, res, next) => {
    res.render('info', {
        id: req.params.id,
    })
})

router.post(
  '/info', [
    check('id').notEmpty().withMessage('Id is not valid')
  ], (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        result.errors.forEach(err => console.log(err.field, ": ", err.msg))
      return res.redirect('/')
    }
    res.redirect('info/' + req.body.id)
  }
)

module.exports = router

