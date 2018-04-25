import UserController from '../controller/user'
import Router from 'koa-router'

const User = new Router();

User.get('/login', UserController.login);
User.post('/register', UserController.register);

export default User