import jwt from 'jsonwebtoken'
import config from '../config/config'
import {
    ArticleModel
} from '../monoose/dbConnect'
import {
    CreateArtimgFs
} from '../utils/util'

class Api {
    constructor() {
        this.get = this.get.bind(this);
    }


    async userlist(ctx, next) {
        const {
            id,
            user
        } = ctx.state;
        if (id && user) {

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
        const file = ctx.request.body.files.file;
        const data = ctx.request.body.fields;
        const result = await ArticleModel.find({
            id,
            user
        });
        if (result[0]) {
            const imgName = await CreateArtimgFs(file);
            const checkBool = checkArtparam(ctx);
            if(checkBool){
                const d = await ArticleModel.create(data);
                if(d){
                    ctx.body = {
                        code: 1,
                        desc: '添加成功',
                        data: d
                    }
                }
            }else{
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
        }else{
            return  false
        }
    }

}

export default new Api()