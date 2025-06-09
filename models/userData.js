const mongoose = require("mongoose")

const schema = new  mongoose.Schema({
    ip: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
})


module.exports = mongoose.model("userData", schema)