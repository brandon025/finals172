var express = require('express')
var app = express ();
var router = require('express').Router()
var mongoose = require('mongoose');
var UserSchema = require('./userModel.js');

// GET: User List
router.route('/')
    .get(function(req, res){
        UserSchema.find(function(error, users) {
            if (error){
                res.send(500);
                console.log("Error: " + error);
            }else{
                res.send(200,users)
            }
        });
    })

// POST: Create a user
    .post(function(req, res){
        var user= new UserSchema(req.body);
    
        console.log("Posted: ", req.body);
    
        user.save(function(error, users) {
            if (error){
                res.send(500);
                console.log("Error: " + error);
            }else{
                res.send(200,users)
            }
        });
    });

// GET: Specific user
router.route('/:user_id')
    .get(function(req, res){
    console.log("GET specific: ", req.params.user_id)
    var user= new UserSchema(req.body);
    UserSchema.findOne({_id : req.params.user_id}, function(error, users){
        if (error){
            res.send(500);
            console.log("Error: " + error);
            }else{
                res.send(200,users);
            }
        });
    })
// PUT: Update user with new info
    .put(function(req, res){
        var user= new UserSchema(req.body);
        console.log("PUT: ", req.params.user_id);
        user.update({_id : req.params.user_id}, req.body, function(error, updatedUser){
            if (error){
            res.send(500);
            console.log("Error: " + error);
            }else{
                res.send(200,updatedUser);
            }
        });
    })

// DELETE: Delete a user
    .delete(function(req,res){
        UserSchema.findByIdAndRemove(req.params.user_id, function(error,delUser){
            if (error){
                res.send(500);
                console.log("Error: " + error);
                }else{
                    res.send(200);
                }
        });
    });

app.use('/', router);

app.use(function(error,req,res,next){
    console.log(error);
    res.status(500);
});

module.exports = router;
