"use strict"

import {
    getArticleList, 
    createArticle, 
    setArticle
} from '../model/article'

import * as Koa from "koa"

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
        this.setarticle = this.setarticle.bind(this);
    }

    /**
     * 获取文章列表
     * @param {*} ctx 
     * @param {*} next 
     */
    async articlelist(ctx: Koa.Context): Promise<any> {
        try {
            const result = await getArticleList(ctx)
            ctx.body = result
        } catch (err) {
            ctx.throw(err);
        }
    }

    /**
     * 创建文章
     * @param {*} ctx 
     * @param {*} next 
     */
    async createarticle(ctx: Koa.Context): Promise<any> {
        try {
            const result = await createArticle(ctx)
            ctx.body = result
        } catch (err) {
            ctx.throw(err);
        }
    }

    /**
     * 修改文章 
     */
    async setarticle(ctx: Koa.Context): Promise<any> {
        try {
            const result = setArticle(ctx)
            ctx.body = result
        } catch (err) {
            ctx.throw(err);
        }
    }
}

export default new ArticleController()