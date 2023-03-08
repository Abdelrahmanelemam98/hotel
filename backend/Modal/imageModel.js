
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const ImageSchema = new mongoose.Schema({
    _id:{type:Number},
    image:{type:String},
    image_type:{type:String},
    room_id:{type:Number, ref:'RoomsAndSuits'}
},{_id:false});

ImageSchema.plugin(autoIncrement,{id:'imageCounter'});

module.exports = mongoose.model('images',ImageSchema);