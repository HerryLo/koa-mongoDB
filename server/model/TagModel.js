import mongoose from 'mongoose'

const TagSchema = mongoose.Schema({
    content: String,
    createUserId: String,
    useNumber: Number,
    createTime: { type: Date, default: Date.now }
})

TagSchema.statics = {
    /* 查找 */
    async findTag(data = {}) {
        const result = await this.find(data);
        return result
    },
    /* 创建 */
    async createTag(data = {}){
        const result = await this.create(data);
        return result;
    }
}

const TagModel = mongoose.model('tag', TagSchema);

module.exports = TagModel