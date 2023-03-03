const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

//Create Schema
const HomeSchema = new mongoose.Schema({
  _id: { type: Number },
  checkIn: { type: String, require: true },
  checkOut: { type: String, require: true },
  Adult: { type: String, requir: true },
  Childern: { type: String, require: true },
  Room: { type: String, require: true },
});

HomeSchema.plugin(autoIncrement, { id: "home_id", inc_field: "_id" });
module.exports = mongoose.model("HomeSchema", HomeSchema);
