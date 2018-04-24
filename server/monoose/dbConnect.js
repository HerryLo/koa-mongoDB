import mongoose from 'mongoose'

function dbConnect() {
    mongoose.connect('mongodb://localhost/accounts');
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function () {
        console.log('db success');
    });
}

module.exports = dbConnect
