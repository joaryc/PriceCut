const db = require("../models");
const Favourite = db.favourites;
const User = db.user;


exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body.occasionId || !req.params["id"]) {

        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    //console.log(req.params)
    const favourite = new Favourite({
        userId: req.params["id"],
        occasionId: req.body.occasionId
    });
    console.log(favourite)
    favourite
        .save(favourite)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the occasion."
            });
        });

    const userId = req.params["id"];
    User.findByIdAndUpdate(userId, { $push: { favourite: favourite._id } }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update user with id=${userId}. Maybe occasion was not found!`
                });
            } else res.send({ message: "user was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + userId
            });
        });

};
exports.findAll = (req, res) => {
    const userId = req.params["id"];
    var condition = userId ? { userId: { "$in": [userId] } } : {};

    Favourite.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving occasions."
            });
        });

};
exports.delete = (req, res) => {
    const favouriteId = req.body.favouriteId;

    Favourite.findByIdAndRemove(favouriteId)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete favourite with id=${favouriteId}. Maybe occasion was not found!`
                });
            } else {
                res.send({
                    message: "favourite was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete favourite with id=" + favouriteId
            });
        });


};