
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const ExtraServicesSchema = new mongoose.Schema({
    _id:{type:Number},
    service_name:{type:String},
    service_price:{type:Number},
    service_details:[{type:String}]
},{id:false});

ExtraServicesSchema.plugin(autoIncrement,{id:'services_id'});
module.exports = mongoose.model('ExtraServices',ExtraServicesSchema)
