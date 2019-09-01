/**
 *
 * author ganbowen
 * description 入口文件
 * created 2019/08/31 11:11:05
 *
 */

const path = require('path')
const express = require('express')
const config = require('./config/index')
// 加载模板
const swig = require('swig')
// 配置模板
const mongoose = require('mongoose')
// obdyparser中间件 获取post请求数据
const bodyParser = require('body-parser')
// 设置cookies
const Cookies = require('cookies')

// 创建APP应用 => nodeJs http server
const app = express()

// 设置静态文件托管
app.use('/public', express.static(path.join(__dirname, '/public')))

/**
 * 配置模板
 * */
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
    req.cookies = new Cookies(req, res)
    req.userInfo = {}
    if (req.cookies.get('userInfo')) {
        req.userInfo = JSON.parse(req.cookies.get('userInfo'))
    }
    next()
})

// 模块划分
app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))
app.use('/', require('./routers/main'))

mongoose.connect(config.dbUrl, {
    useNewUrlParser: true
}, function (err) {
    if (err) {
        console.log('db error')
    } else {
        console.log('db success')
        // 监听端口
        app.listen(config.port)
    }
})

// 用户发送 http 请求-> URL->  解析路由 -> 找到匹配的规则 -> 指定绑定的函数 返回内容
// /public - > 静态 - > 直接读取文件
// 动态 ->处理业务逻辑-> 加载模板，解析模板-> 返回数据给客户端
