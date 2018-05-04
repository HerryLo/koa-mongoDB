import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import session from 'koa-generic-session'
import staticFiles from 'koa-static'
import path from 'path'
import routers from './router/index'
import config from './config/config'
import dbConnect from './monoose/dbConnect'
import redisStore from 'koa-redis'

const app = new Koa();

app.use(cors())
app.use(json())
app.use(logger())
app.use(koaBody({
    multipart: true
}));
app.use(session({
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 1000,
        overwrite: true,
        signed: true
    },
    store: redisStore({})
}));

app.use(staticFiles(path.resolve(__dirname, "./public")))

/** 开启mongoose */
dbConnect();

/** 路由配置 */
routers(app)

app.listen(12345);