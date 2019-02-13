"use strict"

import {
    ArticleModel
} from '../monoose/dbConnect'
import {
    CreateArtimgFs
} from '../utils/util'
import { Article } from '../constant'

/**
 * article Controller
 * Get List 
 * Create Article
 * Set Article
 */
class ArticleController {
    constructor() {
        // 文章 
        this.createarticle = this.createarticle.bind(this);
        this.articlelist = this.articlelist.bind(this);
        // 文章参数判断
        this.checkArtparam = this.checkArtparam.bind(this);
    }

    /**
     * 获取文章列表
     * @param {*} ctx 
     * @param {*} next 
     */
    async articlelist(ctx) {
        const body = ctx.request.body
        try {
            if (body.skip != undefined && body.limit) {
                let option = {
                    skip: Number(body.skip),
                    limit: Number(body.limit)
                };
                let totalPage = await ArticleModel.countNum({});
                let data = await ArticleModel.findArt({}, option);
                ctx.body = {
                    code: 0,
                    totalPage: totalPage,
                    data: data,
                    desc: Article.SUCCESS
                }
            } else {
                ctx.body = {
                    code: 0,
                    data: {},
                    desc: Article.PARAM_FAIL
                }
            }
        } catch (err) {
            ctx.throw(err);
        }
    }

    /**
     * 创建文章
     * @param {*} ctx 
     * @param {*} next 
     */
    async createarticle(ctx, next) {
        const {
            id,
            user
        } = ctx.state;
        const data = ctx.request.body.fields;
        try {
            // 检查参数是否正确
            const checkBool = await this.checkArtparam(ctx.request.body);
            if (checkBool) {
                // 创建标签
                await this.createtag(ctx, next)
                // 将图片保存到public
                const imgName = await CreateArtimgFs(ctx.request.body.files.file);
                // 创建文章
                const d = await ArticleModel.create({
                    content: data.content,
                    userId: id,
                    userName: user,
                    title: data.title,
                    oneNumber: 0,
                    imgUrl: imgName,
                    desc: data.desc,
                    tag: data.tag
                });
                if (d) {
                    ctx.body = {
                        code: 1,
                        desc: Article.ADD_SUCCESS,
                        data: d
                    }
                }
            } else {
                ctx.body = {
                    code: 1,
                    desc: Article.PARAM_FAIL,
                    data: []
                }
            }
        } catch (err) {
            ctx.throw(err);
        }
    }

    /**
     * 修改文章 
     */
    async setarticle(ctx) {
        const body = ctx.request.body;
        try {
            const article = await ArticleModel.findArt({
                _id: body.id
            });
            // 是否存在文章ID
            if (article.length > 0) {
                // 创建标签
                await this.settag(ctx)
                // 检查参数是否正确
                const checkBool = await this.checkArtparam(body);
                if(checkBool){
                    // 将图片保存到public
                    const imgName = await CreateArtimgFs(body.files.file);
                    // 更新文章数据
                    await ArticleModel.update({_id: body.id} ,{
                        content: body.content,
                        title: body.title,
                        imgUrl: imgName,
                        desc: body.desc,
                        tag: body.tag
                    });
                    ctx.body = {
                        code: 0,
                        data: [],
                        desc: Article.SUCCESS
                    }
                }
            } else {
                ctx.body = {
                    code: -1,
                    data: [],
                    desc: Article.NO_ARTICLIID
                }
            }
        } catch (err) {
            ctx.throw(err);
        }
    }

    /**
     * 检查创建文章参数
     * @param {*} ctx 
     */
    checkArtparam(body) {
        if (!body.fields && !body.files.file) return false;
        const data = body && body.fields;
        const d = data
        if (d.content && d.title && d.desc && d.tag) {
            return true
        } else {
            return false
        }
    }

}

export default new ArticleController()