
const { request, response, query } = require("express");
const mongoose = require("mongoose");
require("../Modal/extraServicesModel");

const ExtraServicesSchema=mongoose.model("ExtraServices");

exports.addService = (request , response , next)=>{
    //Extra services
    const {service_name,service_price,service_details} =request.body;

    const extraService = new ExtraServicesSchema({
        service_name:service_name,
        service_price:service_price,
        service_details:service_details
    });

    extraService.save()
        .then(data=>{
            response.status(200).json({message:"Service Added"});
        }).catch(error=>next(error));
}

exports.getServices = (request,response,next)=>{
    
    const query ={}
    if(request.query.id) query._id = Number(request.query.id);
    if(request.query.name) query.service_name = request.query.name;
    if(request.query.price) query.service_price = request.query.price;

    ExtraServicesSchema.find(query)
        .then(data=>{
            response.status(200).json(data)
        }).catch(error=>next(error));
}

exports.updateService =async (request,response,next)=>{
    try{
        const {service_name,service_price,service_details} =request.body;
        const query = {};
        if(request.query.id) query._id = Number(request.query.id);
        if(request.query.name) query.service_name = request.query.name;


        const extraService = await ExtraServicesSchema.updateOne(query,
            {$set:{
                service_name:service_name,
                service_price:service_price,
                service_details:service_details
            }});

            console.log(service_price)
            response.status(200).json({message:"Service Updated"})
        
    }catch(error){
        next(error)
    }
}

exports.deleteService = (request,response,next)=>{
    const query = {};
    if(request.query.id) query._id = Number(request.query.id);
    if(request.query.name) query.service_name = request.query.name;

    ExtraServicesSchema.findOneAndDelete(query)
        .then(res=>{
            response.status(200).json({message:"Service Deleted"});
        }).catch(error=>next(error));
}