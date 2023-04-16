
module.exports = async (req,res,next) =>{
    // 服务端检查有没有 sessionUser
    if(req.session.user){
        return next()
    }

    // 重定向到登录页,响应码302
    res.redirect('/login')
}