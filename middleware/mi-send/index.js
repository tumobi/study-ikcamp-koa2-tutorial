module.exports = () => {
    function render(json) {
        this.set("Content-Type", "application/json")
        this.body = JSON.stringify(json)
    }

    return async (ctx, next) => {
        ctx.send = render.bind(ctx)
        await next()

        // 使用方法
        //ctx.send({
        //   status: 'success',
        //   data: 'hello ikcmap'
        // })
    }
}