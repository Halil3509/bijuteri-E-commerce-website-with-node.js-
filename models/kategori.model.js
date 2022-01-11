const mongoose = require('mongoose');

const KategoriSchema = new mongoose.Schema({
    Ad:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('kategoriler',KategoriSchema);