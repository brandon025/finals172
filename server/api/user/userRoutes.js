var express = require('express')
var app = express ();
var router = require('express').Router()
var mongoose = require('mongoose');
var UserSchema = require('./userModel');

// Populate Data


// GET: User List
router.route('/').get(function(req, res){
        UserSchema.find(function(error, users) {
            if (error){
                res.send(500);
                console.log("Error: " + error);
            }else{
                res.send(200,users)
            }
        });
    });

// POST: Create a user
router.route('/').post(function(req, res){
        var newuser = {};
    
        newuser.username = String(req.body.username); 
        newuser.address = String(req.body.address);
    
        var newSchema = new UserSchema({
            username: newuser.username,
            address: newuser.address
        });
    
        console.log("Posted: ", req.body);
    
        UserSchema.save(function(error, users) {
            if (error){
                res.send(500);
                console.log("Error: " + error);
            }else{
                res.send(200,newuser)
            }
        });
    });

// GET: Specific user
router.route('/:user_id')
    .get(function(req, res){
    console.log("GET: ", req.paramas.user_id)
    UserSchema.findById(req.paramas.user_id, function(error, users){
        if (error){
            res.send(500);
            console.log("Error: " + error);
            }else{
                res.send(200,users);
            }
        });
    });
// PUT: Update user with new info
router.route('/:user_id').put(function(req, res){
        console.log("PUT: ", req.params.user_id);
        var newuser = {};
        newuser.username = String(req.body.username)
        newuser.address = String(req.body.address);
    
        var newSchema = new UserSchema({
        username: newuser.username,
        address: newuser.address
        });
        
        UserSchema.update({_id:req.paramas.user_id},newSchema, function(error, updatedUser){
            if (error){
            res.send(500);
            console.log("Error: " + error);
            }else{
                res.send(200,updatedUser);
            }
        });
    });

// DELETE: Delete a user
router.route('/:user_id').delete(function(req,res){
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
    res.status(500).send({"Error" : error.stack});
});

module.exports = router;
