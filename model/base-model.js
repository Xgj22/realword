module.exports = {
    createdAt:{
        type:Date,
        // 在这里不能直接调用方法，而是传方法给他
        default:Date.now
    },
    updateAt:{
        type:Date,
        // 在这里不能直接调用方法，而是传方法给他
        default:Date.now
    }
}