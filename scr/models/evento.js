const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventoSchema = new Schema({
    name : String,
    sobre : String,
    address1: String,
    latitude1 : String,
    longitude1 : String,
    address2: String,
    latitude2 : String,
    longitude2 : String,
    data1: String,
    data2: String,
    dataVotacao: String,
    hora1: String,
    hora2: String,
    publico : String,
    usuariosVotou : Array ,// id
});
module.exports = mongoose.model('eventos', EventoSchema);
