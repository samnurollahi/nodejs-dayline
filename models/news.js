const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
    },
    urlNews: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    manbagName: {
        type: String,
        required: true,
    },
    manbagIcon: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
    },
})

module.exports = mongoose.model("news", Schema)