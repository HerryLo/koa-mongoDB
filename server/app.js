import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import session from 'koa-generic-session'
import staticFiles from 'koa-static'
import path from 'path'
import routers from './router/index'
import config from './config/config'
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
    await next().catch((err) => {
        if (err.name === 'JsonWebTokenError') {
            ctx.status = 401;
            ctx.body = {
                error: err.originalError ? err.originalError.message : err.message
            };
        } else {
            ctx.status = err.status || 500;
            ctx.body = {
                error: err.originalError ? err.originalError.message : err.message
            };
        }
    });
});

app.use(async (ctx, next) => {
    const {
        URL: {
            pathname
        },
        headers: {
            settoken
        }
    } = ctx.request;
    const isVerify = config.verifyPath.some(item => {
        if (typeof item === 'string') {
            return item === pathname;
        } else if (typeof item === 'object') {
            return !!pathname.match(item)
        }
        return false;
    });
    if (isVerify) {
        let jwtVerify;
        try {
            jwtVerify = await jwt.verify(settoken, config.secret);
        } catch (err) {
            ctx.throw(401, 'JsonWebTokenError', {
                name: 'JsonWebTokenError'
            });
        }
        const {
            id, user
        } = jwtVerify;
        if (id) {
            ctx.state = {
                id,
                user
            }
        }
        await next();
    } else {
        await next();
    }
});

/** 路由配置 */
routers(app)

app.listen(config.port, () => {
    console.log(`node Server open: localhost:${config.port}`)
});