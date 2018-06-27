import jwt from 'jsonwebtoken'
import config from '../config/config'
import {
    ArticleModel,
    UserModel,
    TagModel
} from '../monoose/dbConnect'
import {
    CreateArtimgFs
} from '../utils/util'

class Api {
    constructor() {
        this.userlist = this.userlist.bind(this);
        this.createarticle = this.createarticle.bind(this);
        this.articlelist = this.articlelist.bind(this);
        this.createTag = this.createTag.bind(this);
        this.checkArtparam = this.checkArtparam.bind(this);
    }

    /**
     * 获取用户列表
     * @param {*} ctx 
     * @param {*} next 
     */
    async userlist(ctx, next) {
        const {
            id,
            user
        } = ctx.state;
        try {
            const result = await UserModel.findUser({
                _id: id,
                user: user
            })
            if (result[0].isadmin) {
                let data = await UserModel.findUser({});
                ctx.body = {
                    code: 0,
                    desc: '成功',
                    data: data
                }
            } else {
                ctx.body = {
                    code: 1,
                    desc: '用户不存在',
                    data: []
                }
            }
        } catch (e) {
            console.log(e)
            await next();
        }
    }

    /**
     * 创建 文章
     * @param {*} ctx 
     * @param {*} next 
     */
    async createarticle(ctx, next) {
        const {
            id,
            user
        } = ctx.state;
        const file = ctx.request.body.files && ctx.request.body.files.file;
        const data = ctx.request.body.fields;
        try {
            // 检查参数是否正确
            const checkBool = await this.checkArtparam(ctx.request.body);
            if (checkBool) {
                const result = await UserModel.findUser({
                    _id: id
                });
                if (result[0]) {
                    // 创建标签
                    await this.createTag(ctx, next)
                    // 将图片保存到public
                    const imgName = await CreateArtimgFs(ctx.request.body.files.file);
                    // 创建文章
                    const d = await ArticleModel.create({
                        content: data.content,
                        userId: id,
                        title: data.title,
                        oneNumber: 0,
                        imgUrl: imgName,
                        desc: data.desc,
                        tag: data.tag
                    });
                    if (d) {
                        ctx.body = {
                            code: 1,
                            desc: '添加成功',
                            data: d
                        }
                    }
                } else {
                    ctx.body = {
                        code: 1,
                        desc: '请求参数不正确',
                        data: []
                    }
                }
            } else {
                ctx.body = {
                    code: 1,
                    desc: '参数错误',
                    data: []
                }
            }
        } catch (err) {
            ctx.throw(err);
        }
    }

    /**
     * 获取文章列表
     * @param {*} ctx 
     * @param {*} next 
     */
    async articlelist(ctx, next) {
        const {
            id,
            user
        } = ctx.state
        const body = ctx.request.body
        try {
            if(!body.skip || !body.limit){
                ctx.body = {
                    code: 0,
                    data: {},
                    desc: '参数错误'
                }
                return false
            }
            const result = await UserModel.findUser({
                _id: id,
                user: user
            })
            if (result[0]._id == id) {
                let option = { skip: body.skip, limit: body.limit };
                let data = await ArticleModel.findArt({} ,option);
                ctx.body = {
                    code: 0,
                    data: data,
                    desc: '成功'
                }
            }
        } catch (e) {
            console.log(e);
            await next();
        }
    }

    /**
     * 创建标签
     * @param {*} ctx 
     * @param {*} next 
     */
    async createTag(ctx, next){
        const tags = ctx.request.body.fields.tag
        const {
            id,user
        } = ctx.state
        try{
            const tagList = JSON.parse(tags)
            tagList.map(async (item)=> {
                const result = await TagModel.createTag({
                    content: item,
                    createUserId: id,
                    useNumber: 0,
                })
            })
        }catch(e){
            console.log(e);
            await next();
        }
    }

    /**
     * 检查创建文章参数
     * @param {*} ctx 
     */
    checkArtparam(body) {
        if(!body.fields && !body.files.file) return false;
        const data = body && body.fields;
        const d = data
        if (d.content && d.title && d.desc && d.tag) {
            return true
        } else {
            return false
        }
    }

}

export default new Api()