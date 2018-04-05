const log4js = require('log4js')
const access = require('./access')

const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"]

const baseInfo = {
    appLogLevel: 'debug',  // 指定记录的日志级别
    dir: 'logs',		// 指定日志存放的目录名
    env: 'dev',   // 指定当前环境，当为开发环境时，在控制台也输出，方便调试
    projectName: 'koa2-tutorial',  // 项目名，记录在日志中的项目信息
    serverIp: '0.0.0.0'		// 默认情况下服务器 ip 地址
}

module.exports = (options) => {
    const contextLogger = {}
    const appenders = {}

    const opts = Object.assign({}, baseInfo, options || {})
    const { env, appLogLevel, dir, serverIp, projectName } = opts
    const commonInfo = { projectName, serverIp }

    appenders.cheese = {
        type: 'dateFile',
        filename: `${dir}/task`,
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
    }

    if (env === 'dev' || env === 'local' || env === 'development' ) {
        appenders.out = {
            type: 'console'
        }
    }

    let config = {
        appenders,
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: appLogLevel
            }
        }
    }

    const logger = log4js.getLogger('cheese')

    // log4js.configure({
    //     appenders: {
    //         cheese: {
    //             type: 'dateFile', // 日志类型 
    //             filename: `logs/task`,  // 输出的文件名
    //             pattern: '-yyyy-MM-dd.log',  // 文件名增加后缀
    //             alwaysIncludePattern: true   // 是否总是有后缀名
    //         }
    //     },
    //     categories: {
    //         default: {
    //             appenders: [
    //                 'cheese'
    //             ],
    //             level: 'info'
    //         }
    //     }
    // })

    return async (ctx, next) => {
        const start = Date.now()
        log4js.configure(config)
        methods.forEach((method, i) => {
            contextLogger[method] = (message) => {
                logger[method](access(ctx, message, commonInfo))
            }
        })
        ctx.log = contextLogger

        await next()

        const end = Date.now()
        const responseTime = end - start
        logger.info(`响应时间为：${responseTime / 1000} s`)
    }
}
