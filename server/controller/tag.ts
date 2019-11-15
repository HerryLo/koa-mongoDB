"use strict"

import { 
    createtag, 
    settag 
} from '../model/tag'

import * as Koa from "koa"

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
    async createtag(ctx: Koa.Context) {
        createtag(ctx)
    }

    /**
     * 修改标签
     */
    async settag(ctx: Koa.Context) {
        settag(ctx)

    }
}

export default new TagController()