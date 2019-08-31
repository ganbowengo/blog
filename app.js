/**
 * 
 * author ganbowen
 * description 入口文件
 * created 2019/08/31 11:11:05
 * 
 */

let express = require('express')
// 加载模板
let swig = require('swig')
// 配置模板
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let cookies = require('cookies')

// 创建APP应用 => nodeJs http server
let app = express()

// 设置静态文件托管
app.use('/public', express.static(__dirname + '/public'))

// 配置模板
// 模板文件后缀 解析模板内容的方法
app.engine('html', swig.renderFile)
// 设置模板文件的存放目录
app.set('views', './views')
// 注册模板引擎 第二个参数必须和engine中的第一个参数一至
app.set('view engine', 'html')

// 开发时 模板引擎设置不缓存
swig.setDefaults({
    cache: false
})

app.use(bodyParser.urlencoded({
    extended: true
}))

// 设置cookies
app.use(function (req, res, next) {
    req.cookies = new cookies(req, res)
    req.userInfo = {}
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'))
        }
        cache(e) {}
    }
    next()
})


// 模块划分
app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))
app.use('/', require('./routers/main'))

// // home
// app.get('/', function (req, res, next) {
//     // 读取views目录下的指定文件 解析返给客户端
//     // param 文件名称
//     // param 传递给模板的数据
//     res.render('index')
// })

mongoose.connect('mongodb://localhost:27018/blog', {
    useNewUrlParser: true
}, function (err) {
    if (err) {
        console.log('db error')
    } else {
        console.log('db success')
        // 监听端口
        app.listen(8081)
    }
})


// 用户发送 http 请求-> URL->  解析路由 -> 找到匹配的规则 -> 指定绑定的函数 返回内容
// /public - > 静态 - > 直接读取文件
// 动态 ->处理业务逻辑-> 加载模板，解析模板-> 返回数据给客户端