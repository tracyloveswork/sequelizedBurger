var express = require("express");
var sequelize = require("sequelize");
var router = express.Router();

// Import models to use its database functions.
// var burgers = require("../models/burger.js");
var db = require("../models/");

// Create all our routes and set up logic within those routes where required.
// Index
router.get("/", function(req, res){
// db represents all models in model folder and Burger is defined/exported from burger.js
  db.Burger.findAll()
  // Promise here
  .then(function(dbBurger){
    console.log(dbBurger);
    var hbsObject = { burger: dbBurger };
    res.render("index", hbsObject);
}).catch(function(err) {
        console.log("Error Message: " + err);
        res.send("You got an error!");
    });

  // mySql version of same
  // burger.selectAll(function(data) {
  //   var hbsObject = {
  //     burgers: data
  //   };
  //   console.log(hbsObject);
  //   res.render("index", hbsObject);
  // });
});

// Insert one
router.post("/create", function(req, res) {

  db.Buger.create({
    burger_name: req.body.burger_name
  }).then(function(dbBurger){
    console.log(dbBurger);
    res.redirect("/");
  })
});
// mySql version
// router.post("/", function(req, res) {
//   burger.insertOne([
//     "burger_name", "devoured"
//   ], [
//     req.body.burger_name, req.body.devoured
//   ], function() {
//     res.redirect("/");
//   });
// });


// Update to devoured:true
router.put("/update", function(req, res) {
  db.Burger.update({
    devoured: true
  },
  {
    where: {
      id: req.body.burger_id
    }
  }).then(function(dbBurger){
    res.redirect("/");
  })
});

// Update to devoured:false
router.put("/updateMore", function(req, res) {
  db.Burger.update({
    devoured: false
  },
  {
    where: {
      id: req.body.burger_id
    }
  }).then(function(dbBurger){
    res.redirect("/");
  })
});
// mysql version
// router.put("/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   burger.updateOne({
//     devoured: req.body.devoured
//   }, condition, function() {
//     res.redirect("/");
//   });
// });

// Export routes for server.js to use.
module.exports = router;