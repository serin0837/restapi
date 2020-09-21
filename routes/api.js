/// create all of our routes
const express = require("express");
const router = express.Router(); /// store or rather mount our router handler
const Ninja = require("../models/ninja");

//get a list of ninjas from the db
router.get("/ninjas", function (req, res, next) {
  /// not "api/ninjas" /// because I put in index.js
  res.send({ type: "GET" });
});
//add a new ninja to the db
router.post("/ninjas", function (req, res, next) {
  //   console.log(req.body); // i want to see what i send // then we want to see in response too!
  Ninja.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
  //   res.send({
  //     //   type: "POST", name: req.body.name, rank: req.body.rank

  //     }); // we can see as response too!!
});

//update a ninja in the db
router.put("/ninjas/:id", function (req, res, next) {
  res.send({ type: "PUT" });
});
//delete a ninja from the db
router.delete("/ninjas/:id", function (req, res, next) {
  res.send({ type: "DELETE" });
});

module.exports = router;
