"use strict"

/**
 * 标签模型
 */

import mongoose from 'mongoose'

const TagSchema = mongoose.Schema({
    content: String, //文本
    createUserId: String, //创建用户ID
    useNumber: Number, //使用次数
    createTime: { //创建时间
        type: Date,
        default: Date.now
    }
})

TagSchema.statics = {
    /* 查找 */
    async findTag(data = {}) {
        const result = await this.find(data);
        return result
    },
    /* 创建 */
    async createTag(data = {}) {
        const result = await this.create(data);
        return result;
    }
}

const TagModel = mongoose.model('tag', TagSchema);

module.exports = TagModel