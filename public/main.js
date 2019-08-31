$(function () {
    $.ajax({
        type: 'post',
        url: '/api/user/register',
        data: {
            username: 'admin',
            password: 'admin',
            resPassword: 'admin'
        },
        dataType: 'json',
        success: function (res) {
            console.log('res', res)
        }
    })

    $.ajax({
        type: 'post',
        url: '/api/user/login',
        data: {
            username: 'admin',
            password: 'admin'
        },
        dataType: 'json',
        success: function (res) {
            console.log('res', res)
        }
    })
})