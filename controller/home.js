const homeService = require('../service/home')

module.exports = {
    // 请求参数放在 url ？ 后面
    home: async (ctx, next) => {
        // 访问 /home?name=tumobi&age=30&age=40
        console.log(ctx.request.query) // 输出 { name: 'tumobi', age: [ '30', '40' ] }
        console.log(ctx.request.querystring) // 输出 name=tumobi&age=30&age=40
        ctx.body = '<h1>home page</h1>'
    },

    // 请求参数放在 url 中
    params: async (ctx, next) => {
        // 访问 /users/12/tumobi
        console.log(ctx.params) // 输出 { id: '12', name: 'tumobi' }
        ctx.body = '<h1>/users/:id/:name page</h1>'
    },

    // 请求参数放在 body 中，需要安装 npm i koa-bodyparser -S
    // 增加返回表单页面的路由
    login: async (ctx, next) => {
        await ctx.render('home/login', {
            btnName: 'GOGOGO'
        })
    },

    // 增加响应表单请求的路由
    doLogin: async (ctx, next) => {
        let { name, password } = ctx.request.body
        let data = await homeService.login(name, password)
        ctx.response.body = data
    }
}
