const { response, request } = require("express");
const moongose = require("mongoose");
require("../Modal/homeModal");
const HomeSchema = moongose.model("HomeSchema");

exports.getAll = (request, response, next) => {
  HomeSchema.find()
    .then((data) => {
      response.status(200).json({ message: "All Data", data });
    })
    .catch((error) => {
      next(errors);
    });
};

exports.addData = async (request, response, next) => {
  let addinfo = await new HomeSchema({
    checkIn: request.body.checkIn,
    checkOut: request.body.checkOut,
    Adult: request.body.Adult,
    Childern: request.body.Childern,
    Room: request.body.Room,
  });
  addinfo
    .save()
    .then(() => {
      response.status(201).json({ message: "POST" });
    })
    .catch((error) => {
      next(error);
    });
};
