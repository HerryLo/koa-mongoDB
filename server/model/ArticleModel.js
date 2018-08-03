"use strict"

/**
 * 文章模型
 */

import mongoose from 'mongoose'

const ArticleSchema = mongoose.Schema({
    content: String, //内容
    userId: String, //用户ID
    userName: String, //创建者用户名        
    createTime: { //创建时间
        type: Date,
        default: Date.now
    },
    title: String, //标题
    oneNumber: Number, //查看人数
    imgUrl: String, //图片地址
    desc: String, //描述
    tag: [], //标签列表
    isLower: { //是否下架
        type: Boolean,
        default: false
    }
});

ArticleSchema.statics = {
    /* 查找 */
    async findArt(data = {}, option = {}) {
        const result = await this.find(data).skip(option.skip).limit(option.limit);
        return result
    },
    /* 创建 */
    async createArt(data = {}) {
        const result = await this.create(data);
        return result;
    },
    /* 总页数 */
    async countNum(data = {}, option = {}) {
        const result = await this.count(data);
        return result;
    }
}

const ArticleModel = mongoose.model('article', ArticleSchema);

module.exports = ArticleModel