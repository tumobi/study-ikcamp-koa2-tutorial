const router = require('koa-router')()

module.exports = (app) => {
    router.get('/', app.controller.home.index)

    // 请求参数放在 url ？ 后面
    router.get('/home', app.controller.home.home)

    // 请求参数放在 url 中
    router.get('/users/:id/:name', app.controller.home.params)

    // 请求参数放在 body 中，需要安装 npm i koa-bodyparser -S
    // 增加返回表单页面的路由
    router.get('/login', app.controller.home.login)

    // 增加响应表单请求的路由
    router.post('/login', app.controller.home.doLogin)

    app.use(router.routes())
        .use(router.allowedMethods)
}
