import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    user: String,
    password: String,
    photo: { type: String, min: 10, max: 20 },
    isadmin: Boolean,
    regtime: { type: Date, default: Date.now }
});

UserSchema.statics = {
    /* 查找 */
    async findUser(data = {}) {
        const result = await this.find(data);
        return result
    },
    /* 创建用户 */
    async createUser(data = {}){
        const result = await this.create(data);
        return result;
    }
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel