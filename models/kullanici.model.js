    const mongoose  = require('mongoose');

    const KullaniciSchema = new mongoose.Schema({
        Ad:String,
        Soyad:String,
        Adres:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'adresler'
        },
        Email:{
            type:String,
            unique:true,
            required:true,

        },
        Sifre:String
    });

    module.exports = mongoose.model('kullanicilar',KullaniciSchema);