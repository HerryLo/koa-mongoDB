import mongoose from 'mongoose'

const TagSchema = mongoose.Schema({
    conent: String,
    createUserId: String,
    useNumber: Number,
    createTime: { type: Date, default: Date.now }
})

module.exports = TagSchema