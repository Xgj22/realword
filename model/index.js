const mongoose = require('mongoose');
const { dbUrl } = require('../config/config.default')

// 连接 MongoDB数据库
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection

db.on('error',err =>{
    console.log('MongDB 数据库连接失败',err)
})

db.once('open',function(){
    console.log('MongoDB 数据库连接成功')
})

// 组织导出模型类
module.exports = {
    User:mongoose.model('User',require('./user')),
    Article:mongoose.model('Article',require('./article'))
}