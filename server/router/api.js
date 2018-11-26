import ArticleController from '../controller/article'
import CommentController from '../controller/comment'
import TagController from '../controller/tag'
import UserController from '../controller/user'
import Router from 'koa-router'
const Api = new Router();

/**
 * 用户列表
 */
Api.get('/userlist', UserController.userlist);

/**
 * 创建文章
 */
Api.post('/createarticle',  ArticleController.createarticle);

/**
 * 文章列表
 */
Api.post('/articlelist',  ArticleController.articlelist);

/**
 * 修改文章
 */
Api.put('/setarticle',  ArticleController.setarticle);

/**
 * 创建评论
 */
Api.post('/createcomment',  CommentController.createcomment);


export default Api