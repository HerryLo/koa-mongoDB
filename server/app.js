import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import session from 'koa-session'
import staticFiles from 'koa-static'
import path from 'path'
import routers from './router/index'
import config from './config/config'
import dbConnect from './monoose/dbConnect'

const app = new Koa();
app.use(staticFiles(path.resolve(__dirname, "./public")))
app.use(koaBody({
    multipart: true
}));
app.use(session(config.session, app));

/** 开启mongoose */
dbConnect();

/** 路由配置 */
routers(app)

app.listen(12345);
