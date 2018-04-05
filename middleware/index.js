const miSend = require('./mi-send')
const nunjucks = require('koa-nunjucks-2')
const path = require('path')
const staticFiles = require('koa-static')
const bodyParser = require('koa-bodyparser')


module.exports = (app) => {
    app.use(staticFiles(path.resolve(__dirname, "../public")))
    app.use(nunjucks({
        ext: 'html',
        path: path.join(__dirname, '../views'),
        nunjucksConfig: {
            trimBlocks: true // 开启转义 防Xss
        }
    }))

    app.use(bodyParser())
    app.use(miSend())
}