const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    mail: {
        type: String,
        required: true
    },
    text:{
        type:String,
        required:true
    }
});
 
const Client = mongoose.model('Clients', Schema)

module.exports = Client;

