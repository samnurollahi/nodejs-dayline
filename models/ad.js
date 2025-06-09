const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
    }
})


module.exports = mongoose.model("ad", Schema)