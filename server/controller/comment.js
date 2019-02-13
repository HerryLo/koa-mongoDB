"use strict"

import {
    ArticleModel,
    CommentModel
} from '../monoose/dbConnect'
import { Comment } from '../constant'

/**
 * comment Controller
 * Create Comment
 */
class CommentController {
    constructor() {
        //评论
        this.createcomment = this.createcomment.bind(this);
    }

    /**
     * 创建评论
     */
    async createcomment(ctx) {
        const {
            id,
            user
        } = ctx.state;
        const body = ctx.request.body;
        try {
            if (body.content && body.articleId) {
                const article = await ArticleModel.findArt({
                    _id: body.articleId
                })
                if (article[0]) {
                    const result = await CommentModel.create({
                        articleId: body.articleId, //文章ID
                        userId: id, //用户ID
                        username: user, //
                        avatarURL: '', //用户头像
                        content: body.content, //内容
                    })
                    ctx.body = {
                        code: 0,
                        data: result,
                        desc: Comment.SUCCESS
                    }
                } else {
                    ctx.body = {
                        code: -1,
                        data: [],
                        desc: Comment.NO_ARTICLIID
                    }
                }
            } else {
                ctx.body = {
                    code: -1,
                    data: [],
                    desc: Comment.NO_COMMENT_CONTENT
                }
            }
        } catch (e) {
            ctx.throw(e);
        }
    }
}

export default new CommentController()