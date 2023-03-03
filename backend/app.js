const express = require("express");
const mongoose = require("mongoose");
const homeRouter = require("./Router/homeRouter");
const app = express();
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/HotelDB")
  .then(() => {
    console.log("I am Listing DB......");
    app.listen(process.env.PORT || 8080, () => {
      console.log("I am Listing.........");
    });
  })
  .catch((error) => {
    console.log("Db is down......" + error);
  });

//First Middlware
app.use((request, response, next) => {
  console.log("First MW", request.url, request.method);
  next();
});
app.use(express.json());
// router
app.use(homeRouter);
//not found
app.use((request, response, next) => {
  response.status(404).send("Not Found");
});
// error MiddlWare

app.use((error, request, response, next) => {
  let status = error.status || 500;
  response.status(status).json({ message: error + "" });
});
