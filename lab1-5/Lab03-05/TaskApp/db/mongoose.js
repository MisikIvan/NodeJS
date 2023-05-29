const mongoose = require("mongoose")
let uri = process.env.MONGO_URL;
mongoose.connect(uri)