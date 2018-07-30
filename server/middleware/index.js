"use strict"

import config from '../config/config'
import jwt from 'jsonwebtoken'
import {
    UserModel
} from '../monoose/dbConnect'

/**
 * 中间件 检查token是否失效
 */
async function verify(ctx, next) {
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
            // console.log(config.secret)         
            jwtVerify = await jwt.verify(settoken, config.secret);
        } catch (err) {
            ctx.throw(401, 'JsonWebTokenError', {
                name: 'JsonWebTokenError'
            });
        }
        const {
            id,
            user
        } = jwtVerify;
        // 判断用户是否存在
        const result = await UserModel.findUser({
            _id: id,
            user: user
        })
        if (result[0] && id) {
            ctx.state = {
                id,
                user
            }
            await next();
        } else {
            ctx.throw(404, 'ERROR USER', {
                code: -1,
                desc: '用户不存在'
            });
        }
    } else {
        await next();
    }
}

/**
 * token异常报错
 */
async function tokenError(ctx, next) {
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
}

/**
 * error处理
 * @param {*} ctx 
 * @param {*} next 
 */
async function errorHandler(ctx, next) {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
}

module.exports = {
    verify,
    tokenError,
    errorHandler
}