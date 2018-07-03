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
            let data = await UserModel.findUser({});
            ctx.body = {
                code: 0,
                desc: '成功',
                data: data
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
                    desc: '成功'
                }
            } else {
                ctx.body = {
                    code: 0,
                    data: {},
                    desc: '参数错误'
                }
            }
        } catch (err) {
            ctx.throw(err);
        }
    }

    /**
     * 创建标签
     * @param {*} ctx 
     * @param {*} next 
     */
    async createTag(ctx, next) {
        const tags = ctx.request.body.fields.tag
        const {
            id,
            user
        } = ctx.state
        try {
            const tagList = tags;
            tagList.map(async (item) => {
                const result = await TagModel.createTag({
                    content: item,
                    createUserId: id,
                    useNumber: 0,
                })
            })
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
        const file = ctx.request.body.files && ctx.request.body.files.file;
        const data = ctx.request.body.fields;
        try {
            // 检查参数是否正确
            const checkBool = await this.checkArtparam(ctx.request.body);
            if (checkBool) {
                // 创建标签
                await this.createTag(ctx, next)
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
                        desc: '添加成功',
                        data: d
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
     * 修改文章 
     */
    async setarticle(ctx, next) {
        const {
            id,
            user
        } = ctx.state;
        const body = ctx.request.body;
        try{
            // 是否存在文章ID
            if(body.id){
                const result = await TagModel.update();
            }else{

            }
        }catch(err){
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

export default new Api()