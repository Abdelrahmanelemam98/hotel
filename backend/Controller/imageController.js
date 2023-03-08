
const { request, response } = require("express");
const mongoose = require("mongoose");
const imageMW = require("../Middlware/imageMW");
require("../Modal/imageModel");
const ImageSchema = mongoose.model("images");

exports.addImages = (request, response, next)=>{

    const {id} = request.body;
    const inputCategory = request.body.category;
    const imagePath = request.file.path;

    const imagesForRooms = new ImageSchema({
        image:imagePath,
        image_type:inputCategory,
        room_id:id
    });

    imageMW.storeImageInSpecificFolder(request,inputCategory);

    imagesForRooms.save()  
        .then(data=>{
            response.status(200).json({message:"Image Uploaded"});
        }).catch(error=>next(error));
}

exports.getImages = (request, response,next)=>{
    const query ={}
    if(request.query.id) query._id = Number(request.query.id);
    if(request.query.image_type) query.image_type = request.query.image_type;
    if(request.query.room_id) query.room_id = request.query.room_id;

    ImageSchema.find(query)
        .then(data=>{
            response.status(200).json(data)
        }).catch(error=>next(error));
}

exports.updateImagesById = (request,response,next)=>{

    const {id} = request.body;
    const inputCategory = request.body.category;
    const imagePath = request.file.path;
    ImageSchema.findByIdAndUpdate({_id:request.params.id},
        {$set:{
            image:imagePath,
            image_type:inputCategory,
            room_id:id
        }}).then(data=>{
            response.status(200).json({message:"Image Updated"})
        }).catch(error=>next(error));
}

exports.deleteImageById = (request,response,next)=>{
    ImageSchema.deleteOne({_id:request.params.id})
        .then(data=>{
            response.status(200).json({message:"Image Deleted"})
        }).catch(error=>next(error));
}