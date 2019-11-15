// @ts-ignore
import { ArticleModel } from '../db'
// @ts-ignore
import { Article } from '../constant'

import { createtag, settag } from '../model/tag'
import { CreateArtimgFs } from '../utils/util'
import * as Koa from "koa"


/**
 * 获取文章列表
 * @param ctx 
 */
function getArticleList(ctx: Koa.Context) : void
async function getArticleList(ctx: Koa.Context) {
    try {
        const body = ctx.request.body
        if (body.skip != undefined && body.limit) {
            let option = {
                skip: Number(body.skip),
                limit: Number(body.limit)
            };
            let totalPage: number = await ArticleModel.countNum({});
            let data = await ArticleModel.findArt({}, option);
            return {
                code: 0,
                totalPage: totalPage,
                data: data,
                desc: Article.SUCCESS
            }
        } else {
            return {
                code: 0,
                totalPage: 0,
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
 * @param ctx 
 */
function createArticle(ctx: Koa.Context) : void
async function createArticle(ctx: Koa.Context) {
    const {
        id,
        user
    } = ctx.state;
    const data = ctx.request.body.fields;
    try {
        // 检查参数是否正确
        const checkBool = await checkArtparam(ctx.request.body);
        if (checkBool) {
            // 创建标签
            await createtag(ctx)
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
                return {
                    code: 1,
                    desc: Article.ADD_SUCCESS,
                    data: d
                }
            }
        } else {
            return {
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
 * @param ctx 
 */
function setArticle(ctx: Koa.Context) : void
async function  setArticle(ctx: Koa.Context) {
    const { body } = ctx.request;
    try {
        const article = await ArticleModel.findArt({
            _id: body.id
        });
        // 是否存在文章ID
        if (article.length > 0) {
            // 创建标签
            await settag(ctx)
            // 检查参数是否正确
            const checkBool = await checkArtparam(body);
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
                return {
                    code: 0,
                    data: [],
                    desc: Article.SUCCESS
                }
            }
        } else {
            return {
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
function checkArtparam(body: any) : void
function checkArtparam(body: any) {
    if (!body.fields && !body.files.file) return false;
    const data = body && body.fields;
    const d = data
    if (d.content && d.title && d.desc && d.tag) {
        return true
    } else {
        return false
    }
}

export {
    setArticle,
    createArticle,
    checkArtparam,
    getArticleList,
}
