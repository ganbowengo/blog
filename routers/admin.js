const router = require('./config').router
const User = require('../models/User')
const reponseData = require('./config').reponseData()

router.post('/user/register', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    const resPassword = req.body.resPassword
    if (!username) {
        reponseData.code = 1
        reponseData.message = '用户名不能为空'
        res.json(reponseData)
        return
    }
    if (!password) {
        reponseData.code = 2
        reponseData.message = '密码不能为空'
        res.json(reponseData)
        return
    }
    if (password !== resPassword) {
        reponseData.code = 3
        reponseData.message = '两次密码不一致'
        res.json(reponseData)
        return
    }
    // 用户是否已注册
    User.findOne({
        username: username
    }).then(function (userInfo) {
        if (userInfo) {
            reponseData.code = 4
            reponseData.message = '用户名已存在'
            res.json(reponseData)
            return Promise.reject()
        }
        return new User({
            username: username,
            password: password
        }).save()
    }).then(function (info) {
        reponseData.message = '注册成功'
        res.json(reponseData)
    }).catch(function (err) {
        console.log('err', err)
    })
})

router.post('/user/login', function (req, res, next) {
    const username = req.body.username
    const password = req.body.password
    if (!username) {
        reponseData.code = 1
        reponseData.message = '用户名不能为空'
        res.json(reponseData)
        return
    }
    if (!password) {
        reponseData.code = 2
        reponseData.message = '密码不能为空'
        res.json(reponseData)
        return
    }
    User.findOne({
        username: username,
        password: password
    }).then(function (userInfo) {
        if (!userInfo) {
            reponseData.code = 3
            reponseData.message = '用户名或密码错误'
            res.json(reponseData)
            return Promise.reject()
        }
        reponseData.message = '登录成功'
        reponseData.userInfo = {
            id: userInfo._id,
            username: userInfo.username
        }
        req.cookies.set('userInfo', JSON.stringify({
            id: userInfo._id,
            username: userInfo.username
        }))
        res.json(reponseData)
    })
})

module.exports = router
