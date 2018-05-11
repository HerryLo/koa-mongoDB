import jwt from 'jsonwebtoken'
import config from '../config/config'
import {
    ArticleModel
} from '../monoose/dbConnect'
import path from 'path'
import fs from 'fs'

class Api {
    constructor() {
        this.get = this.get.bind(this);
    }

    async get(ctx, next) {
        const {
            id,
            user
        } = ctx.state;
        if (id && user) {
            const file = ctx.file;
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
        const ext ç='.'+file.type.split('/')[1];
        const name = file.name.split('.')[0]
        const imgName = `${name}_${new Date().getTime().toString()}${ext}`;
        const newpath =path.join(__dirname, '../public/artimg/'+imgName);
        console.log(newpath);
        const reader = await fs.createReadStream(file.path); //创建可读流
        const stream = await fs.createWriteStream(newpath); //创建一个可写流
        reader.pipe(stream);
        ctx.body = {
            data: {
                imgurl: `artimg/${imgName}`
            }
        }
        return;
        const result = await ArticleModel.find({
            id,
            user
        });
        if (result[0]) {
            ctx.body = {
                code: 1,
                desc: '',
                data: []
            }
        } else {
            ctx.body = {
                code: 1,
                desc: '用户不存在',
                data: []
            }
        }
    }

}

export default new Api()