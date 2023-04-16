const express = require('express')

const router = express.Router()

router.use(require('./user'))
router.use(require('./article'))

// 暴露出去，这里跟ES6语法不同
module.exports = router