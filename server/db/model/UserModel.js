"use strict"

/**
 * 用户模型
 */

import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    user: String, //用户名
    avatarURL: String, //用户头像
    password: String, //密码
    photo: { //手机号
        type: String,
        min: 10,
        max: 20
    },
    isadmin: Boolean, //是否为管理员
    regtime: { //创建时间
        type: Date,
        default: Date.now
    }
});

UserSchema.statics = {
    /* 查找 */
    async findUser(data = {}) {
        const result = await this.find(data);
        return result
    },
    /* 创建用户 */
    async createUser(data = {}) {
        const result = await this.create(data);
        return result;
    }
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel