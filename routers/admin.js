var express = require('express')
var router = express.Router()

router.get('/user', function (req, res, next) {
    // 读取views目录下的指定文件 解析返给客户端
    // param 文件名称
    // param 传递给模板的数据
    res.send('index - user')
})

module.exports = router
