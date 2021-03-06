module.exports = {
    index: async (ctx, next) => {
        await ctx.render("home/index", { title: "iKcamp欢迎您" })
    },

    // 请求参数放在 url ？ 后面
    home: async (ctx, next) => {
        // 访问 /home?name=tumobi&age=30&age=40
        console.log(ctx.request.query) // 输出 { name: 'tumobi', age: [ '30', '40' ] }
        console.log(ctx.request.querystring) // 输出 name=tumobi&age=30&age=40
        ctx.send({status: 200})
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
        const { app } = ctx
        let { name, password } = ctx.request.body
        let res = await app.service.home.login(name, password)
        if (res.status === -1) {
            await ctx.render('home/login', res.data)
        } else {
            ctx.state.title = '个人中心'
            await ctx.render('home/success', res.data)
        }
        // 返回 json 数据
        // ctx.set("Content-Type", "application/json")
        // ctx.body = JSON.stringify(json)
    }
}
