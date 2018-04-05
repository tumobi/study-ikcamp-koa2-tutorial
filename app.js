const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const nunjucks = require('koa-nunjucks-2')
const path = require('path')
const staticFiles = require('koa-static')

const app = new Koa()
app.use(bodyParser())

app.use(staticFiles(path.resolve(__dirname, "./public")))

app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
        trimBlocks: true // 开启转义 防Xss
    }
}))

router(app)

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})