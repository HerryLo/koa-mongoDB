import Router from 'koa-router'
import User from  './user'
import Api from  './api'

const router = new Router();

export default (app) => {
    router.use('/user', User.routes(), User.allowedMethods())
    router.use('/api', Api.routes(), Api.allowedMethods())

    app.use(router.routes(), router.allowedMethods())
}