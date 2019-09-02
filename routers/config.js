const express = require('express')
const router = express.Router()
const reponseData = function () {
    return {
        code: 0,
        message: ''
    }
}
module.exports = {
    router,
    reponseData
}
