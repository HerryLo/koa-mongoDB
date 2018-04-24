export default {
    session: {
        key: 'koa:sess',
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false,
    },
    db: {
        url: 'mongodb://localhost/test'
    }
}