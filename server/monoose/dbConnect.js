import mongoose from 'mongoose'
import UserModel from '../model/UserModel'
import config from '../config/config'

mongoose.connect(config.db.url, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db success');
});

module.exports = {
    UserModel
}
