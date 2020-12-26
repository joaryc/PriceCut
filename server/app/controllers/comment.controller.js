const db = require("../models");
const Comment = db.comments;
const Occasion = db.occasion;


exports.create = (req, res) => {

    if (!req.body.text || !req.params["id"]) {

        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const comment = new Comment({
        name: req.body.name,
        username: req.body.username,
        text: req.body.text,
        rate: req.body.rate,
        occasionId: req.params.id

    });

    comment
        .save(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Comment."
            });
        });


    const id = req.params.id;
    Occasion.findByIdAndUpdate(id, { $push: { comments: comment._id } }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update occasion with id=${id}. Maybe occasion was not found!`
                });
            } else res.send({ message: "occasion was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating occasion with id=" + id
            });
        });
};


exports.findAll = (req, res) => {
    console.log("abc");
    const occasionId = req.query.occasionId;

    var condition = occasionId ? { occasionId: { "$in": [occasionId] } } : {};

    Comment.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comments."
            });
        });

};