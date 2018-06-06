import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import session from 'koa-generic-session'
import staticFiles from 'koa-static'
import path from 'path'
import routers from './router/index'
import config from './config/config'
import { verify, tokenError, errorHandler} from './middleware'
import redisStore from 'koa-redis'
import cors from 'kcors'
import json from 'koa-json'
import logger from 'koa-logger'
import jwt from 'jsonwebtoken'

const app = new Koa();

app.use(cors())
app.use(json())
app.use(logger())
app.use(koaBody({
    multipart: true
}));
// app.use(session({
//     store: redisStore({
//         host: config.redis.host,
//         port: config.redis.port
//     })
// }));

app.use(staticFiles(path.resolve(__dirname, "./public")))

app.use(async (ctx, next) => {
    await tokenError(ctx, next);
});

app.use(async (ctx, next) => {
    await verify(ctx, next);
});

/** 异常 */
app.on('error', (err) => {
    log.error('server error', err)
});
app.use(errorHandler)

/** 路由配置 */
routers(app)

app.listen(config.port, () => {
    console.log(`Node Server open: localhost:${config.port}`)
});