// 用户验证
const { body } = require('express-validator')
const validate = require('../middleware/validate')
// 导入 User 数据库
const { User } = require('../model')
const md5 = require('../util/md5')

exports.register = validate([//1.配置验证规则
    // body请求体里面的方法
    // .withMessage 配置提醒消息
    body('user.username').notEmpty().withMessage('用户名不能为空')
        .custom(async (username)=>{// 自定义验证
            const user = await User.findOne({ username })
            if(user){
                return Promise.reject('用户名已存在')
            }
        }),


    body('user.password').notEmpty().withMessage('密码不能为空'),


    body('user.email')
        .notEmpty().withMessage('邮箱不能为空')
        .isEmail().withMessage('邮箱格式不正确')
        .bail()// 正确往后走，不正确停止
        .custom(async (email)=>{// 自定义验证
            const user = await User.findOne({ email })
            if(user){
                return Promise.reject('邮箱已存在')
            }
        })
        ],(req,res,next)=>{//2.判断验证结果
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // 客户端出错
                return res.status(400).json({ errors: errors.array() });
            }
            next()// 放行
        }
)

exports.login = [
    // 由于顾及逻辑的顺序，需要配置多个validate
    // .custom 自定义验证方法
    validate([
        body('user.email').notEmpty().withMessage('邮箱不能为空'),
        body('user.password').notEmpty().withMessage('密码不能为空')
    ]),
    validate([
        body('user.email').custom(async (email,{ req })=>{
            const user = await User.findOne({ email }).select(['password','email','password','image','_id'])
            if(!user){
                return Promise.reject('邮箱不存在')
            }

            // 将数据挂载到请求对象中，后续中间件也可以使用了
            req.user = user
            console.log(123)
            console.log(req.user)
        })
    ]),
    validate([
        body('user.password').custom(async (password,{ req })=>{
            // const password1 = await User.findOne({ password })
            if(req.user.password!==md5(password)){
                return Promise.reject('密码错误')
            }
        })
    ])
]