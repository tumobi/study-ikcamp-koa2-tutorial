const nunjucks = require('koa-nunjucks-2')
const path = require('path')
const ip = require('ip')
const staticFiles = require('koa-static')
const bodyParser = require('koa-bodyparser')
const miSend = require('./mi-send')
const miLog = require('./mi-log')


module.exports = (app) => {
    app.use(miLog({
        env: app.env,  // koa 提供的环境变量
        projectName: 'koa2-tutorial',
        appLogLevel: 'debug',
        dir: 'logs',
        serverIp: ip.address()
    }))

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