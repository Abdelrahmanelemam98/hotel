
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);


const RoomsSuitsSchema = new mongoose.Schema({
    _id:{type:Number},
    type:{type:String ,enum:["Junior Suits","Family Room","Double Room", "Deluxe Room", "Superior Room"] },
    room_price:{type:Number},
    image:{type:String},
    room_details:{type:Number, ref:'RoomDetails'},
    extra_services:[{type:Array, ref:'ExtraServices'}]
},{_id:false});

RoomsSuitsSchema.plugin(autoIncrement,{id:"room_id"});
module.exports = mongoose.model("RoomsAndSuits", RoomsSuitsSchema);


//=============================================================================//

const RoomDetailsSchema = new mongoose.Schema({
    _id:Number,
    description:{type:String},
    amenities_details:{type:Number, ref:'RoomAmenities'},
    checkInAvailableTime:{type:Date},
    checkoutTime:{type:Date},
    emailArrivalTime:{type:Number},
    pets:{type:String , enum:["Allow", "Not Allow"]},
    children_details:{type:Number , ref:'ChildernDetails'}
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
    children_allowed:{type:Boolean},
    extra_bed:{type:Boolean},
    extra_bed_price:{type:Number},
    children_breakfast_price:{type:Number}
},{_id:false});

ChildernDetailsSchema.plugin(autoIncrement,{id:'childrenDetails_id'});
module.exports = mongoose.model('ChildernDetails', ChildernDetailsSchema)



