const express = require('express')
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')
const auth = require('../middleware/auth')
const noAuth = require('../middleware/no-auth')

const router = express.Router()

router.get('/login',noAuth,userCtrl.showLogin)

router.get('/register',userCtrl.showRegister)

router.get('/logout',userCtrl.logout)

router.post('/register',userValidator.register,userCtrl.register)

router.get('/setting',auth,userCtrl.showSetting)

router.get('/profile/:username',userCtrl.showProfile)

router.get('/profile/:username/favorite',userCtrl.showProfile)

// 暴露出去，这里跟ES6语法不同
module.exports = router