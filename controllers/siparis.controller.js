const mongoose = require('mongoose');

const SiparisModel = require('../models/siparis.model');
const UrunModel = require('../models/urun.model');

exports.list = (req, res, next) => {
    var userId = req.params.id;
    SiparisModel.find({ kullanici: userId }, (err, doc) => {
        if (err) res.render('error', { error: err.message });
        else res.render('basket',{orders:doc, id:userId});
    }).populate({
        path:'urun',
        populate:{
            path:'Kategori'
        }
    });
}
var action = "";
exports.addToBasket = (req, res, next) => {
    let createData = {
        kullanici: req.body.userId,
        urun: req.body.productId
    }
    var siparisler = new SiparisModel(createData);
    siparisler.save((err, doc) => {
        if (err) res.render('error', { error: err.message });
        else {
            UrunModel.find((err, result) => {
                if (err) res.render('error', { error: err.message });
                else {
                    action = "success";
                    res.render('products', { products: result, id: req.body.userId, action: action });
                    action = "undefined";
                }
            });
        }
    });
}
var action = "";
exports.removeFromBasket = (req, res, next) => {
    var orderId = req.body.orderId;
    var userId = req.body.userId;
    SiparisModel.findByIdAndDelete({ _id: orderId }, (err, doc) => {
        if(err) res.render('error',{error:err.message});
        else {
            UrunModel.find((err, result) => {
                if (err) res.render('error',{error:err.message});
                else {
                    action = "deleted";
                    res.render('products',{products:result,id:userId, action:action});
                    action = "undefined";
                }
            });
        }
    })
}