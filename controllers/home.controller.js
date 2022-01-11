const mongoose = require('mongoose');

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const KullaniciModel = require('../models/kullanici.model');
const AdresModel = require('../models/adres.model');

var action = "";


exports.OpenSignupPage = (req, res, next) => {
    res.render('signup', { action: action });
}

exports.OpenLoginPage = (req, res, next) => {
    res.render('login', { action: action });
} 
exports.OpenHomePage = (req,res,next) => { 
    res.render('home',{id:req.params.id});
}

var loginedUserId = "";
exports.login = (req, res, next) => {
    KullaniciModel.find({ Email: req.body.Email }).then(result => {
        console.log(result);
        if (result.length < 1) {
            action = "error"
            res.render('login', { action: action });
        }  // e postayı bulamayınca oluşan yer
        bcrypt.compare(req.body.Sifre, result[0].Sifre, (err, doc) => {
            if (err) {
                action = "error";
                res.render('login', { action: action });
            };
            if (doc) {
                const token = jwt.sign({
                    Email: result[0].Email,
                    _id: result[0]._id,
                },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    }
                )
               res.render('home',{id:result[0]._id})
            }
            else {
                action = "error";
                res.render('login', { action: action });
                action ="undefined";
            };
        });
    }).catch(error=> console.log(error));
}

exports.signup = (req, res, next) => {
    KullaniciModel.find({ Email: req.body.Email }).then(result => {
        if (result.length >= 1) {
            action = 'fault';
            res.render('signup', { action: action });
        }
        else {
            bcrypt.hash(req.body.Sifre, 10, (err, hash) => {
                if (err) res.render('error', { error: err.message });
                else {
                    const kullanici = new KullaniciModel({
                        Ad: req.body.Ad,
                        Soyad: req.body.Soyad,
                        Email: req.body.Email,
                        Sifre: hash
                    });
                    kullanici.save().then(result => {
                        console.log(result);
                        action = "created";
                        res.render('login', { action: action });
                        action= "undefined";
                    })
                        .catch(err => {
                            res.render('error', { error: err.message });
                        });

                }
            })
        }
    });
}

exports.OpenAccount = (req,res,next) => { 
    var id = req.params._id;
    KullaniciModel.findById(id,(err,doc)=>{
        if(err) res.render('error',{error:err});
        else {
            AdresModel.find({kullanici:id},(err,result) =>{
                if(err) res.render('error',{error:err.message});
                else {
                    res.render('account',{
                        id:id,
                        ad:doc.Ad,
                        soyad:doc.Soyad,
                        adres:"Boş doldurunuz",
                        adresler:result
                    })
                }
            })
           
        }
    })
}