import ApiController from '../controller/api'
import Router from 'koa-router'
const Api = new Router();

// 用户列表
Api.get('/userlist', ApiController.userlist);
// 创建文章
Api.post('/createarticle', ApiController.createarticle);
// 文章列表
Api.post('/articlelist', ApiController.articlelist);
// 更新文章
Api.put('/setarticle', ApiController.setarticle);
// 创建评论
Api.put('/createcomment', ApiController.setarticle);


export default Api