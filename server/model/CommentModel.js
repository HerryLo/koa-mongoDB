"use strict"

/**
 * 评论模型
 */

import mongoose from 'mongoose'

const CommentSchema = mongoose.Schema({
    articleId: String, //文章ID
    userId: String, //用户ID
    username: String, //用户名
    avatarURL: String, //用户头像
    content: String, //内容
    praiseNum: { //点赞人数
        type: Number,
        default: 0
    },
    createTime: { //创建时间
        type: Date,
        default: Date.now
    }
})

CommentSchema.statics = {
    
}

const CommentModel = mongoose.model('comment', CommentSchema);

module.exports = CommentModel