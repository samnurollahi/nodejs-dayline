const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).then((result) => {
  console.log("db connect");
}).catch(err => {
    console.log("db erorr: ", err)
})
