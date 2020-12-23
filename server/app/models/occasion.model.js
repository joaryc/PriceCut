module.exports = mongoose => {
    const Occasion = mongoose.model(
        "occasion",
        mongoose.Schema({
            title: String,
            start_date: Date,
            end_date: Date,
            price: Number,
            description: String,
            pic_link: String,
            gallery1: String,
            gallery2: String,
            gallery3: String,
            gallery4: String,
            status: String,
            occasion_link: String,
            comments: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "comment"
            }]
        }, { timestamps: true })
    );

    return Occasion;
};