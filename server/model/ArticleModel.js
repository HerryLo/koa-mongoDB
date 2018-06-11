import mongoose from 'mongoose'

const ArticleSchema = mongoose.Schema({
    content: String,
    userId: String,
    createTime: { type: Date, default: Date.now },
    title: String,
    oneNumber: Number,
    imgUrl: String,
    desc: String,
    tag: []
});

ArticleSchema.statics = {
    /* 查找 */
    async findArt(data = {}) {
        const result = await this.find(data);
        return result
    },
    /* 创建 */
    async createArt(data = {}){
        const result = await this.create(data);
        return result;
    },
    /* update */
    async updateArt(data = {}){
        const result = await this.update(data);
        return result;
    }
}

const ArticleModel = mongoose.model('article', ArticleSchema);

module.exports = ArticleModel