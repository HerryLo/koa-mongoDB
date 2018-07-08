import Koa from 'koa'
import koaBody from 'koa-body'
import staticFiles from 'koa-static'
import path from 'path'
import routers from './router/index'
import config from './config/config'
import { verify, tokenError, errorHandler} from './middleware'
import json from 'koa-json'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import limit from 'koa-limit'
const cors = require('kcors')

const app = new Koa();
// If you are using reverse proxy on the front of node, like 'nginx', please set this 
app.proxy = true;

app.use(cors({
    'origin':()=>{
        // if (ctx.url === '/test') {
        //     return "*"; // 允许来自所有域名请求
        // }
        // 允许请求
        return 'http://localhost:12346' || 'http://boss.didiheng.com'; 
    }
}))
app.use(json())
app.use(logger())
app.use(helmet())
app.use(koaBody({
    multipart: true
}));
app.use(limit({
    limit: 1000,
    interval: 1000 * 60 * 60
}));

app.use(staticFiles(path.resolve(__dirname, "./public")))

app.use(async (ctx, next) => {
    await tokenError(ctx, next);
});

app.use(async (ctx, next) => {
    await verify(ctx, next);
});

/** 路由配置 */
routers(app)

/** 异常 */
app.use(errorHandler)
app.on('error', (err) => {
    console.error('Server Error', err)
});

app.listen(config.port, () => {
    console.log(`Node Server open: localhost:${config.port}`)
});