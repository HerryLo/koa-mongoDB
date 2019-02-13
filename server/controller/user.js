"use strict"

import {
    UserModel
} from '../monoose/dbConnect'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import { User } from '../constant'
/**
 * user Controller
 * Post login
 * Post register
 * Get getUserInfo
 * Get userlist
 */
class UserController {
    constructor() {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.userlist = this.userlist.bind(this);
    }

    /**
     * 用户登录
     * @param {*} ctx 
     * @param {*} next 
     */
    async login(ctx, next) {
        try {
            const {
                user,
                password
            } = ctx.request.body;
            const result = await UserModel.findUser({
                user: user,
                password: password
            });
            if (result[0] && result[0].isadmin) {
                const token = jwt.sign({
                    id: result[0]._id,
                    user: user
                }, config.secret, {
                    expiresIn: '100h' //到期时间
                });
                ctx.body = {
                    code: 0,
                    token,
                    user,
                    desc: User.LOGIN_SUCCESS
                }
            } else {
                ctx.body = {
                    code: 1,
                    desc: User.LOGIN_FAIL
                }
            }
        } catch (err) {
            console.log(err)
            await next();
        }
    }

    /**
     * 用户注册
     * @param {*} ctx 
     * @param {*} next 
     */
    async register(ctx) {
        try {
            const {
                user,
                password,
                photo,
                isadmin
            } = ctx.request.body;
            const result = await UserModel.findUser({
                user: user,
                photo: photo
            });
            if (result[0]) {
                ctx.body = {
                    code: 1,
                    desc: User.USER_REGISTERED,
                    data: result[0]
                }
            } else {
                const result = await UserModel.createUser({
                    user: user,
                    password: password,
                    photo: photo,
                    isadmin: isadmin || false
                });
                if(result) {
                    ctx.body = {
                        code: 0,
                        desc: User.REGISTER_SUCCESS,
                        data: {
                            user: user,
                            photo: photo
                        }
                    }
                }else{
                    ctx.body = {
                        code: 0,
                        desc: User.REGISTER_FAIL,
                        data: {}
                    }
                }
            }
        } catch (err) {
            ctx.throw(err);
        }

    }

    /**
     * 获取用户信息
     * @param {*} ctx 
     * @param {*} next 
     */
    async getUserInfo(ctx) {
        try {
            const {id, user} = ctx.state;
            const result = await UserModel.findUser({
                _id: id,
                user: user
            });
            if (result[0] && result[0].isadmin) {
                ctx.body = {
                    code: 0,
                    desc: User.SUCCESS,
                    data: result[0]
                }
            } else {
                ctx.body = {
                    code: 1,
                    desc: User.USER_LOGIN
                }
            }
        } catch (err) {
            ctx.throw(err);
        }
    }

    /**
     * 获取用户列表
     * @param {*} ctx 
     * @param {*} next 
     */
    async userlist(ctx) {
        try {
            let data = await UserModel.findUser({});
            ctx.body = {
                code: 0,
                desc: User.SUCCESS,
                data: data
            }
        } catch (err) {
            ctx.throw(err);
        }
    }
}

export default new UserController()
