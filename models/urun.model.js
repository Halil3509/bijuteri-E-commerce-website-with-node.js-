const mongoose = require('mongoose');

const UrunSchema = new mongoose.Schema({
    Baslik:{type:String, required:true},
    ResimUrl:String,
    Kategori:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'kategoriler'
    },
    Fiyat:Number,
    Aciklama:String
});

module.exports = mongoose.model('urunler',UrunSchema);