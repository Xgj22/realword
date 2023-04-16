const crypto = require('crypto')

// console.log(crypto.getHashes())
// 密码加密
// .digest('hex') 十进制的方式
module.exports = str =>{
    return crypto.createHash('md5')
        .update('lagou'+str)
        .digest('hex')
}