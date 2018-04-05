const Koa = require('koa')
// 注意 require('koa-router') 返回的是函数
const router = require('koa-router')()
const Router = require('koa-router');
const app = new Koa()

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>index page</h1>'
    // 会继续匹配相同路由并执行
    await next();
})

router.all('/', async (ctx, next) => {
    console.log('match "all" method')
    await next();
})

router.get('/home', async (ctx, next) => {
    ctx.response.body = '<h1>home page</h1>'
})

router.get('404', '/404', async (ctx, next) => {
    ctx.status = 404
    ctx.response.body = '404 Not Found'
})

// 其它请求方法
router
    .get('/test', async (ctx, next) => {
        ctx.body = 'get test page!';
    })
    .post('/test', async (ctx, next) => {
        ctx.body = 'post test page!';
    })
    .put('/test/:id', async (ctx, next) => {
        ctx.body = 'put test page!';
    })
    .del('/test/:id', async (ctx, next) => {
        ctx.body = 'del test page!';
    })
    .all('/test/:id', async (ctx, next) => {
        ctx.body = 'all test page!';
    });

router.all('/*', async (ctx, next) => {
    console.log('set Access-Control-Allow-Origin')
    // *代表允许来自所有域名请求
    ctx.set("Access-Control-Allow-Origin", "*");
    await next()
})

// 命名路由
router.get('user', '/users/:id', (ctx, next) => {
    console.log(ctx.request.url)
    // 根据路由名生成 url
    // const url = router.url('user', 3)
    const url = router.url('user', { id: 3 })
    console.log(url)
    ctx.response.body = '<h1>users page</h1>'
})

// 单个路由多中间件的处理
router.get(
    '/multiple/:id',
    async (ctx, next) => {
        // 首先读取用户的信息，异步操作
        ctx.state.user = { name: 'tumobi', age: 30 }
        next()
    },
    async (ctx, next) => {
        console.log(ctx.state.user)
        ctx.body = 'multiple page'
    }
)

// 嵌套路由
const forums = new Router();
const posts = new Router();
posts.get('/', (ctx, next) => {
    // 匹配路由 /forums/3/posts
    ctx.body = 'posts page'
})
posts.get('/:id', (ctx, next) => {
    // 匹配路由 /forums/3/posts/2
    ctx.body = 'posts detail page'
})
forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods())
app.use(forums.routes())

// 路由前缀
const pre = new Router({
    prefix: '/prefix'
});
pre.get('/', (ctx, next) => {ctx.body = 'prefix page' }); // 匹配路由 "/prefix" 
pre.get('/:id', (ctx, next) => { ctx.body = 'prefix detail page'}); // 匹配路由 "/prefix/:id" 
app.use(pre.routes())

// url 参数
router.get('/:category/:title', function (ctx, next) {
    console.log(ctx.params);
    // => { category: 'programming', title: 'how-to-node' } 
});

// 重定向路由，应该放在最后
router.use((ctx, next) => {
    // 重定向到 404 页面
    ctx.redirect(ctx.router.url('404'))
})

app.use(router.routes())

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})
