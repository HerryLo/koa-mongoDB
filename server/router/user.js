import UserController from '../controller/user'
import Router from 'koa-router'

const User = new Router();

User.get('/login', UserController.login);
User.get('/register', UserController.register);

export default User