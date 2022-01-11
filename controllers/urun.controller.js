const mongoose = require('mongoose');

const UrunModel = require('../models/urun.model');
const kategoriModel = require('../models/kategori.model');

var userId = "boş";
exports.list = (req, res, next) => {
    userId = req.params.id;
    console.log(userId);
    UrunModel.find((err, doc) => {
        if (err) res.status(500).json({ message: "Ürün getirme işlemi gerçekleşmedi" });
        else res.render('products',{products:doc,id:userId, action:"undefined"});
    });
}


//Geçici
exports.create = (req, res, next) => {
    kategoriModel.find({ Ad: "Küpe" }, (err, doc) => {
        if (err) res.status(500).json({ message: "kategori ismi bulunamadı" });
        else {
            var createData = {
                Baslik: "Çelik Kolye",
                ResimUrl: "http://www.axesua.com/Uploads/UrunResimleri/buyuk/gold-marina-6li-celik-kupe-ake3390-b46241.jpg",
                Kategori: doc[0]._id,
                Fiyat: "50",
                Aciklama: "Çelik ürünler karma yapmamaktadır."
            }
            var urunler = new UrunModel(createData);
            urunler.save((err, doc) => {
                if (err) res.status(500).json({ message: "işlem başarısız " + err.message });
                else res.status(200).json({ message: "işlem başarılı", data: doc });
            });
        }
    });

}

exports.getDetail = (req,res,next) =>{
    var productId = req.body.productId;
    var userId = req.body.userId;
    UrunModel.findById(productId,(err,doc)=>{
        if(err) res.render('error',{error:err.message});
        else res.render('product-detail',{product:doc, id:userId});
    });
}

exports.filter = (req,res,next) => { 
    var kategoriId = req.body.kategoriId;
    userId = req.body.userId;
    kategoriModel.find({_id:kategoriId},(err,doc)=>{
        console.log(doc);
        if(err) res.render('error',{error:err.message});
        else{
            UrunModel.find({Kategori:doc[0]._id},(err, result) => {
                if (err) res.status(500).json({ message: "Ürün getirme işlemi gerçekleşmedi" });
                else res.render('products',{products:result, id:userId, action:"undefined"});
            });
        }
    });
}

