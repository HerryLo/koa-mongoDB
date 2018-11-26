"use strict"

import {
    TagModel
} from '../monoose/dbConnect'

/**
 * tag Controller
 * Create Tag
 * Set Tag
 */
class TagController {
    constructor() {
        // 标签
        this.createtag = this.createtag.bind(this);
        this.settag = this.settag.bind(this);
    }

    /**
     * 创建标签
     * @param {*} ctx 
     * @param {*} next 
     */
    async createtag(ctx) {
        const tags = ctx.request.body.fields.tag
        const {
            id
        } = ctx.state
        try {
            const result = TagModel.findTag({
                createUserId: id
            })
            if(result.length == 0){
                const tagList = tags;
                tagList.map(async (item) => {
                    await TagModel.createtag({
                        content: item,
                        createUserId: id,
                        useNumber: 0,
                    })
                })
            }
        } catch (err) {
            ctx.throw(err);
        }
    }

    /**
     * 修改标签
     */
    async settag(ctx) {
        const {
            id
        } = ctx.state
        const result = TagModel.findTag({
            createUserId: id 
        })
        if(result.length > 0){
            console.log(12);
        }
    }
}

export default new TagController()