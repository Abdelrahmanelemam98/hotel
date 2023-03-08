const { request, response } = require('express');
const mongoose = require('mongoose');

const dateTimeMW = require("../Middlware/dateTimeMW")
require('../Modal/rooms&suitsModel');
require("../Modal/extraServicesModel");
require("../Modal/imageModel");
const RoomsSuitsSchema = mongoose.model("RoomsAndSuits");
const RoomDetailsSchema = mongoose.model('RoomDetails');
const RoomAmenitiesSchema = mongoose.model("RoomAmenities");
const ChildernDetailsSchema=mongoose.model("ChildernDetails");
const ImageSchema = mongoose.model("images");

exports.addRoom = (request, response, next)=>{
    //Rooms
    const {type,room_price,extra_services} = request.body;
    //Room Details
    const {description,checkInAvailableTime,checkoutTime,emailArrivalTime,pets} = request.body;
    //Room Amenities
    const {num_of_person,wifi,wifi_price,breakfast,towels,swimming_pool} = request.body;
    //Children Details
    const {children_allowed,extra_bed,extra_bed_price,children_breakfast_price} = request.body;
    
    const childrenDetails = new ChildernDetailsSchema({
        children_allowed:children_allowed,
        extra_bed:extra_bed,
        extra_bed_price:extra_bed_price,
        children_breakfast_price:children_breakfast_price
    });
    
    const amenitiesDetails = new RoomAmenitiesSchema({
        num_of_person:num_of_person,
        wifi:wifi,
        wifi_price,wifi_price,
        breakfast:breakfast,
        towels:towels,
        swimming_pool:swimming_pool
    });


    childrenDetails.save()
        .then(children=>{
            amenitiesDetails.save()
                .then(amenities=>{
                    const RoomDetails = new RoomDetailsSchema({
                        description:description,
                        amenities_details:amenities._id,
                        checkInAvailableTime:dateTimeMW.getTimeFromString(checkInAvailableTime),
                        checkoutTime:dateTimeMW.getTimeFromString(checkoutTime),
                        emailArrivalTime:emailArrivalTime,
                        pets:pets,
                        children_details:children._id,
                    });

                    RoomDetails.save()
                        .then(room=>{
                            const RoomSuits = new RoomsSuitsSchema({
                                type:type,
                                room_price:room_price,
                                room_details:room._id,
                                extra_services:extra_services
                            });

                            RoomSuits.save()
                                .then(roomSuits=>{
                                    response.status(200).json({message:"Room Added"});
                                })
                                .catch(e5=>{
                                    ChildernDetailsSchema.deleteOne({_id:children._id})
                                    .then()
                                    RoomAmenitiesSchema.deleteOne({_id:amenities._id})
                                    .then()
                                    RoomDetailsSchema.deleteOne({_id:room._id})
                                    .then()

                                    next(e5);
                                })
                        }).catch(e4=>{
                            ChildernDetailsSchema.deleteOne({_id:children._id})
                            .then()
                            RoomAmenitiesSchema.deleteOne({_id:amenities._id})
                            .then()
                            next(e4);
                        })
                }).catch(e3=>{
                    ChildernDetailsSchema.deleteOne({_id:children._id})
                    .then()
                    next(e3);
                })
        }).catch(e2=>{
            next(e2)
        })
        

}

exports.getRooms = (request,response,next)=>{

    const query ={}
    if(request.query.id) query._id = Number(request.query.id);
    if(request.query.type) query.type = request.query.type;
    if(request.query.price) query.room_price = request.query.price

    RoomsSuitsSchema.find(query)
        .populate({path:"extra_services", model:"ExtraServices",select:{_id:0}})
        .populate({
            path:"room_details",
            model:'RoomDetails',
            select:{_id:0},
            populate:[{
                path:"amenities_details",
                model:'RoomAmenities',
                select:{_id:0}
            },{
                path:"children_details",
                model:"ChildernDetails",
                select:{_id:0}
            }]
        }).then(data=>{
            response.status(200).json(data);
        }).catch(error=>next(error));
}

exports.deleteRoomByID = (request, response , next)=>{
    const id = request.params.id;
    RoomsSuitsSchema.findById({_id:id})
    .then(roomSuit=>{
        ImageSchema.deleteMany({room_id:roomSuit._id})
            .then(image=>{
                RoomDetailsSchema.findById({_id:roomSuit.room_details})
                .then(roomDetails=>{
                    ChildernDetailsSchema.findOneAndDelete({_id:roomDetails.children_details})
                    .then(child=>{
                        RoomAmenitiesSchema.findByIdAndDelete({_id:roomDetails.amenities_details})
                        .then(amenities=>{
                            RoomDetailsSchema.findByIdAndDelete({_id:roomSuit.room_details})
                            .then(last=>{
                                RoomsSuitsSchema.findByIdAndDelete({_id:id})
                                .then(res=>{
                                    response.status(200).json({message:"Room Deleted"});
                                })
                            })
                        })
                    })
                })
            })
    }).catch(error=>next(error))
}

exports.updateRoomById = async (request , response, next)=>{
   try{
    //Rooms
    const {type,room_price,extra_services} = request.body;
    //Room Details
    const {description,checkInAvailableTime,checkoutTime,emailArrivalTime,pets} = request.body;
    //Room Amenities
    const {num_of_person,wifi,wifi_price,breakfast,towels,swimming_pool} = request.body;
    //Children Details
    const {children_allowed,extra_bed,extra_bed_price,children_breakfast_price} = request.body;

    const id = request.params.id;
    const RoomsAndSuits = await RoomsSuitsSchema.findByIdAndUpdate({_id:id},
        {$set:{
            type:type,
            room_price:room_price,
            extra_services,extra_services
        }});
    
    const RoomDetails = await RoomDetailsSchema.findByIdAndUpdate({_id:RoomsAndSuits.room_details},
        {$set:{
            description:description,
            checkInAvailableTime:dateTimeMW.getTimeFromString(checkInAvailableTime),
            checkoutTime:dateTimeMW.getTimeFromString(checkoutTime),
            emailArrivalTime:emailArrivalTime,
            pets:pets,
        }});
    
    const RoomAmenities = await RoomAmenitiesSchema.findByIdAndUpdate({_id:RoomDetails.amenities_details},
        {$set:{
            num_of_person:num_of_person,
            wifi:wifi,
            wifi_price,wifi_price,
            breakfast:breakfast,
            towels:towels,
            swimming_pool:swimming_pool
        }});
    
    const ChildernDetails = await ChildernDetailsSchema.findByIdAndUpdate({_id:RoomDetails.children_details},
        {$set:{
            children_allowed:children_allowed,
            extra_bed:extra_bed,
            extra_bed_price:extra_bed_price,
            children_breakfast_price:children_breakfast_price
        }});

    response.status(200).json({message:"Room Updated"});

   }catch(error){
        next(error)
   }
    
}





