const { User } = require('../model')

exports.showLogin = async (req,res,next)=>{
    try {
        console.log(req.session.user)
        res.render('login',{
            isLogin:true
        })
    } catch (error) {
        next(error)
    }
    
}

exports.showRegister = async (req,res,next)=>{
    try {
        res.render('login')
    } catch (error) {
        next(error)
    }
    
}

exports.register = async (req,res,next)=>{
    try {
        // 1.数据验证
        // 2.验证通过，创建新的用户
        const user = new User(req.body.user)
        await user.save()

        // 3.保持登录状态
        req.session.user = user
        res.status(200).json({
            user
        })
    } catch (error) {
        next(error)
    }
}

exports.showSetting = async (req,res,next)=>{
    try {
        res.render('setting')
    } catch (error) {
        next(error)
    }
    
}

exports.showProfile = async (req,res,next)=>{
    try {
        res.render('profile')
    } catch (error) {
        next(error)
    }
    
}

exports.showProfile = async (req,res,next)=>{
    try {
        res.render('profile')
    } catch (error) {
        next(error)
    }
    
}

exports.logout = async (req,res,next) =>{
    try {
        req.session.user = null
        // 重定向
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}