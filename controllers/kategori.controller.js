const mongosoe = require('mongoose');
const kategoriModel = require('../models/kategori.model');

const KategoriModel = require('../models/kategori.model');

exports.list = (req,res,next) =>{

} 


//geçici oluşturma işlemi
exports.create = (req,res,next) =>{
   var createData = {
     Ad:"Yüzük"
   }
   var kategoriler = new KategoriModel(createData);
   kategoriler.save((err,doc)=>{
       if(err) res.status(500).json({message:"işlem başarısız"+ err.message});
       else res.status(200).json({message:"işlem başarılı",data:doc});
   });
}
