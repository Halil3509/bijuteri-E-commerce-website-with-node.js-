const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const KullaniciModel = require('../models/kullanici.model');
const AdresModel = require('../models/adres.model');

exports.ChangeData = (req,res,next) =>{
    var userId = req.body.userId;
    var updateData = { 
        Ad:req.body.Ad,
        Soyad:req.body.Soyad
    }
    var createData = { 
        AcikAdres: req.body.Adres,
        kullanici:userId
    }
    KullaniciModel.findByIdAndUpdate({_id:userId},updateData,(err,doc)=>{
        if(err) res.render('error',{error:err.message});
        else {
            res.render('home',{id:userId});
        }
    });
    
    var adresler = new AdresModel(createData);
    adresler.save((err,result)=>{
        if(err) res.render('error',{error:err.message});
    });
}

