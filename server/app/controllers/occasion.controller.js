const db = require("../models");
const Occasion = db.occasion;
const comment = require("./comment.controller.js");

exports.create = (req, res) => {
    // Validate request
    console.log(req.body)
    if (!req.body.title || !req.body.start_date || !req.body.end_date ||
        !req.body.price || !req.body.occasion_link) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const occasion = new Occasion({
        title: req.body.title,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        price: req.body.price,
        description: req.body.description,
        pic_link: req.body.pic_link,
        gallery1: req.body.gallery1,
        gallery2: req.body.gallery2,
        gallery3: req.body.gallery3,
        gallery4: req.body.gallery4,
        occasion_link: req.body.occasion_link,
        comments: req.body.comments,
        status: "notPublished"
    });

    // Save occasion in the database
    occasion
        .save(occasion)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the occasion."
            });
        });
};


// Retrieve all occasions from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Occasion.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving occasions."
            });
        });

};

// Find a single occasion with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Occasion.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found occasion with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving occasion with id=" + id });
        });

};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;


    Occasion.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update  occasion with id=${id}. Maybe  occasion was not found!`
                });
            } else res.send({ message: " Occasion was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating  occasion with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Occasion.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete  occasion with id=${id}. Maybe  occasion was not found!`
                });
            } else {
                res.send({
                    message: " Occasion was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete  Occasion with id=" + id
            });
        });

};

// Delete all occasions from the database.
exports.deleteAll = (req, res) => {
    Occasion.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} occasions were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all occasions."
            });
        });
};