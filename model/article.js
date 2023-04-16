const mongoose = require('mongoose')
const Schema = mongoose.Schema
const baseModel = require('./base-model')

// 创建模型

const articleSchema = new mongoose.Schema({
    ...baseModel,
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    tagList:{
        type:[String],
        default:null
    },
    favoritesCount:{
        type:Number,
        default:0
    },
    author:{
        type: Schema.Types.ObjectId,
        // 作者id映射到user，查询出来
        ref: "User",
        required: true,
    }
})

module.exports = articleSchema