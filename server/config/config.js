export default {
    session: {
        key: 'koa:sess',
        name: 'JSTOKEN',
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false,
        store: new MongooseStore()
    },
    db: {
        url: 'mongodb://localhost/test'
    }
}