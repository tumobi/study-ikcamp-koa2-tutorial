const _path = require('path')
const fs = require('fs')

module.exports = (opts) => {
    let { app, rules = [] } = opts

    if (!app) {
        throw new Error("the app params is necessary!")
    }

    const appKeys = Object.keys(app)

    rules.forEach(item => {
        let { path, name } = item
        if (appKeys.includes(name)) {
            throw new Error(`the name of ${name} already exists!`)
        }

        let content = {}

        fs.readdirSync(path).forEach(filename => {
            let extname = _path.extname(filename)
            if (extname === '.js') {
                let name = _path.basename(filename, extname)
                content[name] = require(_path.join(path, filename))
            }
        })
        app[name] = content
    });
}