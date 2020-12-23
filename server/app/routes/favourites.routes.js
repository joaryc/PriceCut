  const favourite = require("../controllers/favourite.controller.js");
  var router = require("express").Router();
  module.exports = app => {

      router.post("/user/:id/favourite", favourite.create);

      router.delete("/user/:id/favourite", favourite.delete);

      router.get("/user/:id/favourite", favourite.findAll);

      app.use('/api/cutprice', router);
  };