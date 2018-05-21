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
        this.createArticle = this.createArticle.bind(this);
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
            const result = UserModel.find({
                _id: id,
                user: user
            })
            if (result[0]) {
                let data = UserModel.find({});
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
    async createArticle(ctx, next) {
        const {
            id,
            user
        } = ctx.state;
        try {
            const file = ctx.request.body.files.file;
            const data = ctx.request.body.fields;
            const result = await ArticleModel.find({
                id,
                user
            });
            if (result[0]) {
                const imgName = await this.CreateArtimgFs(file);
                const checkBool = checkArtparam(ctx);
                if (checkBool) {
                    await this.createTag(ctx, next)
                    const d = await ArticleModel.create(Object.assign(data));
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
                    desc: '用户不存在',
                    data: []
                }
            }
        } catch (e) {
            console.log(e);
            await next();
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
        const query = ctx.request.query
        try {
            const result = await UserModel.find({
                _id: id,
                user: user
            })
            if (result[0]._id == id) {
                let data = await ArticleModel.find({});
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
        const tags = ctx.request.body.tag
        const {
            id,user
        } = ctx.state
        try{
            tags.map(async (item)=> {
                const result = await TagModel.create({
                    content: item,
                    createUserId: id,
                    useNumber: 0,
                })
            })
            return true;
        }catch(e){
            console.log(e);
            await next();
        }
    }

    /**
     * 检查创建文章参数
     * @param {*} ctx 
     */
    async checkArtparam(ctx) {
        const data = ctx.request.body.fields;
        const d = data
        if (d.userId &&
            d.title &&
            d.imgUrl &&
            d.desc &&
            d.tag.length > 0) {
            return true
        } else {
            return false
        }
    }

}

export default new Api()