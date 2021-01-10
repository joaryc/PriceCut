module.exports = mongoose => {
    const Favourite = mongoose.model(
        "favourite",
        mongoose.Schema({
            occasionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "occasion"
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }

        }, { timestamps: true })
    );

    return Favourite;
};