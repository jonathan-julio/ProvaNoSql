const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : String,
    email : String,
    senha : String,
    eventos : Array, // id
    meusEventos : Array // id
});

module.exports = mongoose.model('users', UserSchema);