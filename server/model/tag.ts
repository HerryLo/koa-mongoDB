// @ts-ignore
import { TagModel } from '../db'

import * as Koa from "koa"

/**
 * 创建tag标签
 * @param {*} ctx 
 */
async function createtag(ctx: Koa.Context) {
    const tags = ctx.request.body.fields.tag
    const {
        id
    } = ctx.state
    try {
        const result = TagModel.findTag({
            createUserId: id
        })
        if (result.length == 0) {
            const tagList = tags;
            tagList.map(async (item: string) => {
                await TagModel.createtag({
                    content: item,
                    createUserId: id,
                    useNumber: 0,
                })
            })
        }
        return {
            code: 0
        }
    } catch (err) {
        ctx.throw(err);
    }
}

/**
 * 修改标签
 * @param {*} ctx 
 */
async function settag(ctx: Koa.Context) {
    const {
        id
    } = ctx.state
    const result = TagModel.findTag({
        createUserId: id
    })
    if (result.length > 0) {
        
    }
}

export {
    settag,
    createtag
}