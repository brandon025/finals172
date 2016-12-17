var express = require('express')
var app = express ();
var router = require('express').Router()
var mongoose = require('mongoose');
var PostSchema = require('./postModel.js');

// GET: Post List
router.route('/')
    .get(function(req, res){
        PostSchema.find(function(error, posts) {
            if (error){
                res.send(500);
                console.log("Error: " + error);
            }else{
                res.send(200,posts)
            }
        });
    })

// POST: Create a post
    .post(function(req, res){
        var post= new PostSchema(req.body);
    
        console.log("Posted: ", req.body);
    
        post.save(function(error, posts) {
            if (error){
                res.send(500);
                console.log("Error: " + error);
            }else{
                res.send(200,posts)
            }
        });
    });

// GET: Specific post
router.route('/:post_id')
    .get(function(req, res){
    console.log("GET specific: ", req.params.post_id)
    var post= new PostSchema(req.body);
    PostSchema.findOne({_id : req.params.post_id}, function(error, posts){
        if (error){
            res.send(500);
            console.log("Error: " + error);
            }else{
                res.send(200,posts);
            }
        });
    })
// PUT: Update post with new info
    .put(function(req, res){
        var post= new PostSchema(req.body);
        console.log("PUT: ", req.params.post_id);
        post.update({_id : req.params.post_id}, req.body, function(error, updatedPost){
            if (error){
            res.send(500);
            console.log("Error: " + error);
            }else{
                res.send(200,updatedPost);
            }
        });
    })

// DELETE: Delete a post
    .delete(function(req,res){
        PostSchema.findByIdAndRemove(req.params.post_id, function(error,delPost){
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
