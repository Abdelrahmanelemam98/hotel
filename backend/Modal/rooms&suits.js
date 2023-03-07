
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const RoomsSuitsSchema = new mongoose.Schema({
    _id:{type:Number},
    type:{type:String ,enum:["Junior Suits","Family Room","Double Room", "Deluxe Room", "Superior Room"] },
    price:{type:Number},
    images:[{type:String}],
    details:{type:Number, ref:'RoomDetails'},
    extra_services:{type:Number, ref:'ExtraServices'}
},{_id:false});

RoomsSuitsSchema.plugin(autoIncrement,{id:"room_id"});
module.exports = mongoose.model("RoomsSuitsSchema", RoomsSuitsSchema);


//=============================================================================//

const RoomDetailsSchema = new mongoose.Schema({
    _id:Number,
    description:{type:String},
    amenities_details:{type:Number, ref:'RoomAmenities'},
    checkInAvailableTime:{type:String},
    checkoutTime:{type:String},
    emailArrivalTime:{type:String},
    pets:{type:String , enum:["Allow", "Not Allow"]},
    children_details:{type:number , ref:'ChildernDetails'}
},{_id:false});

RoomDetailsSchema.plugin(autoIncrement,{id:"details_id"});
module.exports = mongoose.model('RoomDetails',RoomDetailsSchema);

//============================================================================//

const RoomAmenitiesSchema = new mongoose.Schema({
    _id:{type:Number},
    num_of_person:{type: Number},
    wifi:{type:String , enum:["Free", "Not Free"]},
    wifi_price:{type:Number},
    breakfast:{type:String, enum:['Exist', 'Not Exist']},
    towels:{type:String, enum:['Exist', 'Not Exist']},
    swimming_pool:{type:String,enum:['Exist', 'Not Exist']}
},{_id:false});

RoomAmenitiesSchema.plugin(autoIncrement,{id:'amenities_id'});
module.exports = mongoose.model('RoomAmenities', RoomAmenitiesSchema);

//=============================================================================//

const ChildernDetailsSchema = new mongoose.Schema({
    _id:{type:Number},
    allowed:{type:Boolean},
    extra_bed:{type:Boolean},
    price_of_bed:{type:Number},
    price_of_breakfast:{type:Number}
},{_id:false});

ChildernDetailsSchema.plugin(autoIncrement,{id:'childrenDetails_id'});
module.exports = mongoose.model('ChildernDetails', ChildernDetailsSchema)


//=============================================================================//

const ExtraServicesSchema = new mongoose.Schema({
    _id:{type:Number},
    name:{type:String},
    price:{type:Number},
    details:{type:String}
},{id:false});

ExtraServicesSchema.plugin(autoIncrement,{id:'services_id'});
module.exports = mongoose.model('ExtraServices',ExtraServicesSchema)




