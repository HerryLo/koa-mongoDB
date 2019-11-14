import {
    TagModel
} from '../db'

console.log(12)

/**
 * 创建tag标签
 * @param {*} ctx 
 */
export async function  createtag(ctx) {
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
 * @param {*} ctx 
 */
export async function settag(ctx) {
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