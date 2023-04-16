const express = require('express')
const morgan = require('morgan')
// 引入路由
const router = require('./router')
const path = require('path')
const errorhandler = require('errorhandler')
const session = require('express-session')
const { sessionSecret } = require('./config/config.default')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')

// 加载一下数据库
require('./model')

const app = new express()

// 配置使用中间件
// 存储 session：1.生成 session ID 2.存储数据
// 获取 session：1.根据session ID 获取 session 容器中的数据
// req.session.xxx
// 默认数据存储到内存中
app.use(session({
    secret: sessionSecret,// 签发session id 的密钥
    resave: false,
    saveUninitialized: true,
    cookie: { 
        // 设置过期时间，单位是毫秒
        // maxAge:1000*60*60*24,
        // secure: true //只有https 协议才会收发 Cookie
        // store: MongoStore.create(options)// 将数据持久化到 mongoDB 数据库中
        store: MongoStore.create({
            mongoUrl: 'mongodb://127.0.0.1:27017/test',   // realword是数据库名称
            touchAfter: 24 * 3600    // 过期时间
        })
    }
}))

// 确保挂载到 session 初始化配置之后
app.use((req,res,next) => {
    // 统一给模板添加数据
    app.locals.sessionUser = req.session.user
    next()
})

// 开放静态资源
app.use('/public',express.static(path.join(__dirname,'./public')))
app.use('/node_modules',express.static(path.join(__dirname,'./node_modules')))

// view engine setup
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// 配置日志文件中间件
app.use(morgan('dev'))

// 配置解析请求体的中间件
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
// 配置跨域请求的中间件

app.use(router)

// 挂载统一处理服务端错误处理中间件
if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler())
}

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`欢迎使用服务器，地址：http://localhost:${port}/`)
})