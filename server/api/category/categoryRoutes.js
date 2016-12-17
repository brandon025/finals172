var express = require('express')
var app = express ();
var router = require('express').Router()
var mongoose = require('mongoose');
var CategorySchema = require('./categoryModel.js');

// GET: Category List
router.route('/')
    .get(function(req, res){
        CategorySchema.find(function(error, category) {
            if (error){
                res.send(500);
                console.log("Error: " + error);
            }else{
                res.send(200,category)
            }
        });
    })

// POST: Create a category
    .post(function(req, res){
        var category= new CategorySchema(req.body);
    
        console.log("Categoryed: ", req.body);
    
        category.save(function(error, category) {
            if (error){
                res.send(500);
                console.log("Error: " + error);
            }else{
                res.send(200,category)
            }
        });
    });

// GET: Specific category
router.route('/:category_id')
    .get(function(req, res){
    console.log("GET specific: ", req.params.category_id)
    var category= new CategorySchema(req.body);
    CategorySchema.findOne({_id : req.params.category_id}, function(error, category){
        if (error){
            res.send(500);
            console.log("Error: " + error);
            }else{
                res.send(200,category);
            }
        });
    })
// PUT: Update category with new info
    .put(function(req, res){
        var category= new CategorySchema(req.body);
        console.log("PUT: ", req.params.category_id);
        category.update({_id : req.params.category_id}, req.body, function(error, updatedCategory){
            if (error){
            res.send(500);
            console.log("Error: " + error);
            }else{
                res.send(200,updatedCategory);
            }
        });
    })

// DELETE: Delete a category
    .delete(function(req,res){
        CategorySchema.findByIdAndRemove(req.params.category_id, function(error,delCategory){
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
