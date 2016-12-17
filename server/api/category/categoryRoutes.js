var express = require('express')
var app = express ();
var router = require('express').Router()
var mongoose = require('mongoose');
var CategorySchema = require('./categoryModel');

router.route('/')
    .get(function(req, res){
        console.log('Hey from user!!');
    res.send({ok: true});
    });

module.exports = router;