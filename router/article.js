const express = require('express')

const router = express.Router()
const articleContrl = require('../controller/article')
const articleValidator = require('../validator/article')
const auth = require('../middleware/auth')

router.get('/',articleContrl.showIndex)

router.get('/editor',(req,res,next)=>{
    try {
        res.render('editor')
    } catch (error) {
        next(error)
    }
    
})

router.get('/editor/:articleId',(req,res,next)=>{
    try {
        res.render('editor')
    } catch (error) {
        next(error)
    }
    
})

router.get('/article/:articleId',(req,res,next)=>{
    try {
        res.render('article')
    } catch (error) {
        next(error)
    }
})

router.post('/articles',)

module.exports = router