import mongoose from 'mongoose'
import config from '../config/config'

function dbConnect() {
    mongoose.connect(config.db.url);
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function () {
        console.log('db success');
    });
}

module.exports = dbConnect
