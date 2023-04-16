// 已经登录就没必要跳转到 login
module.exports = async (req,res,next) =>{
    // 服务端检查有没有 sessionUser
    if(req.session.user){
        return res.redirect('/')
    }

    next()
}