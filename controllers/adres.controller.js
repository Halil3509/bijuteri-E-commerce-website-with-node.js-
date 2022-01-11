const mongoose = require('mongoose');

const AdresModel = require('../models/adres.model');

exports.create = (req,res,next) =>{
    var userId = req.body.id;
  let createData = { 
      AcikAdres:req.body.acikAdres,
      kullanici:userId
  }
  var adresler = new AdresModel(createData);
  adresler.save((err,doc)=>{
      if(err) res.render('error',{error:err.message});
      else res.render('');
  })
}

exports.list = (req,res,next) =>{
    var userId = req.params.id;
    AdresModel.find({_id:userId},(err,doc)=>{
        if(err) res.render('error',{error:err.message});
        else res.render('');
    })
}

