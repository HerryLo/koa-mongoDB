import mongoose from 'mongoose'

const TagSchema = mongoose.Schema({
    conent: String,
    createUserId: String,
    useNumber: Number,
    createTime: { type: Date, default: Date.now }
})

TagSchema.statics = {
    /* 查找 */
    async find(data) {
        const result = await this.find(data);
        return result
    },
    /* 创建 */
    async create(data){
        const result = await this.create(data);
        return result;
    }
}

const TagModel = mongoose.model('tag', TagSchema);

module.exports = TagModel