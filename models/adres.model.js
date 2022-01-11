const mongoose = require('mongoose');

const AdresSchema = new mongoose.Schema({
    AcikAdres:{
        type:String,
        required:true
    },
    kullanici:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'kullanicilar'
    }
});

module.exports = mongoose.model('adresler',AdresSchema);