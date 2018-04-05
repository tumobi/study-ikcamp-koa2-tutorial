const router = require('koa-router')()
const homeController = require('./controller/home')

module.exports = (app) => {
    router.get('/', homeController.index)

    // 请求参数放在 url ？ 后面
    router.get('/home', homeController.home)

    // 请求参数放在 url 中
    router.get('/users/:id/:name', homeController.params)

    // 请求参数放在 body 中，需要安装 npm i koa-bodyparser -S
    // 增加返回表单页面的路由
    router.get('/login', homeController.login)

    // 增加响应表单请求的路由
    router.post('/login', homeController.doLogin)

    app.use(router.routes())
        .use(router.allowedMethods)
}
