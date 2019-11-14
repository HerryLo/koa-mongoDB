"use strict"

import { 
    createtag, 
    settag 
} from '../model/tag'

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
        createtag(ctx)
    }

    /**
     * 修改标签
     */
    async settag(ctx) {
        settag(ctx)
    }
}

export default new TagController()