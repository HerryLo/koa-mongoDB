import ApiController from '../controller/api'
import Router from 'koa-router'
const Api = new Router();

Api.get('/userlist', ApiController.userlist);
Api.post('/createarticle', ApiController.createarticle);
Api.post('/articlelist', ApiController.articlelist);
Api.put('/setarticle', ApiController.setarticle);

export default Api