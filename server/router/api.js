import ApiController from '../controller/api'
import Router from 'koa-router'
const Api = new Router();

Api.get('/userlist', ApiController.get);
Api.post('/createarticle', ApiController.createArticle);

export default Api