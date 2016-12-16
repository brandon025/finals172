var router = require('express').Router();
// var restful = require('node-restful');
var user = ["Michael"];
// setup boilerplate route jsut to satisfy a request
// for building
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/finals-test', (err, db) => {
                    if (err){
                        return console.log('Unable to connect to MongoDB server');
                    }
                    console.log('Connected to MongoDB');
                    db.close();
                    });
                    



//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.
router.route('/')
  .get(function(req, res){
    console.log('Hey from user!!');
    res.json(user);
  });

router.get('/error', function(req,res){
    console.log("An error appeared!");
    throw "error";
});

module.exports = router;
