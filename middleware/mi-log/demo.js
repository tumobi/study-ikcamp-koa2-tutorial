const log4js = require('log4js')

log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: 'cheese.log'
        }
    },
    categories: {
        default: {
            appenders: [
                'cheese'
            ],
            level: 'error'
        }
    }
})

const logger = log4js.getLogger('cheese')

// logger.level = 'debug'
logger.trace('Some trace messages')
logger.debug('Some debug messages')
logger.info('Some info messages')
logger.warn('Some warn messages')
logger.error('Some error messages')
logger.fatal('Some fatal messages')