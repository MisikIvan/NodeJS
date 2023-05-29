require("dotenv").config()
require("../db/mongoose")
const express = require('express')



const UserRouter = require("./routers/user")
const TaskRouter = require("./routers/task")
const app = express()

app.use(UserRouter);
app.use(TaskRouter);


app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });