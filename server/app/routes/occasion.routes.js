module.exports = app => {
    const occasion = require("../controllers/occasion.controller.js");
    const comment = require("../controllers/comment.controller.js");
    var router = require("express").Router();


    router.post("/", occasion.create);

    router.get("/", occasion.findAll);

    router.get("/:id", occasion.findOne);

    router.put("/:id", occasion.update);

    router.delete("/:id", occasion.delete);

    router.delete("/", occasion.deleteAll);

    router.post("/:id/addcomment", comment.create);

    router.get("/comments", comment.findAll);

    app.use('/api/cutprice', router);
};