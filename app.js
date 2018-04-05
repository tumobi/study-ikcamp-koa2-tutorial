const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

const app = new Koa()
app.use(bodyParser())

// 请求参数放在 url ？ 后面
router.get('/home', async (ctx, next) => {
    // 访问 /home?name=tumobi&age=30&age=40
    console.log(ctx.request.query) // 输出 { name: 'tumobi', age: [ '30', '40' ] }
    console.log(ctx.request.querystring) // 输出 name=tumobi&age=30&age=40
    ctx.body = '<h1>home page</h1>'
})

// 请求参数放在 url 中
router.get('/users/:id/:name', async (ctx, next) => {
    // 访问 /users/12/tumobi
    console.log(ctx.params) // 输出 { id: '12', name: 'tumobi' }
    ctx.body = '<h1>/users/:id/:name page</h1>'
})

// 请求参数放在 body 中，需要安装 npm i koa-bodyparser -S
// 增加返回表单页面的路由
router.get('/login', async (ctx, next) => {
    ctx.response.body =
        `
      <form action="/login" method="post">
        <input name="name" type="text" placeholder="请输入用户名：ikcamp"/> 
        <br/>
        <input name="password" type="text" placeholder="请输入密码：123456"/>
        <br/> 
        <button>GoGoGo</button>
      </form>
    `
})

// 增加响应表单请求的路由
router.post('/login', async (ctx, next) => {
    let { name, password } = ctx.request.body
    if (name === 'ikcamp' && password === '123456') {
        ctx.response.body = `Hello, ${name}`
    } else {
        ctx.response.body = '账号信息错误'
    }
})


app.use(router.routes())

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})