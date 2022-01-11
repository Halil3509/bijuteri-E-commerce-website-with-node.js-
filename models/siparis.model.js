const mongoose  = require('mongoose');

const SiparisSchema = new mongoose.Schema({
    kullanici:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'kullanicilar'
    },
    urun:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'urunler'
    }
});

module.exports = mongoose.model('siparisler',SiparisSchema);