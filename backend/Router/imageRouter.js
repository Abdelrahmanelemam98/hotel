
const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const uploadImage = require('../Middlware/imageMW');
const validator = require("../Middlware/errorValidator");
const controller = require("../Controller/imageController");

router.route('/image')
    .post(
        uploadImage.upload.single('image'),
        uploadImage.imageBodyValidation,
        validator,
        controller.addImages)
    .get(controller.getImages)
    

router.route('/image/:id')
    .patch(
        uploadImage.upload.single('image'),
        uploadImage.imageBodyValidation,
        uploadImage.imageParamsValidation,
        validator,
        controller.updateImagesById)
    .delete(
        uploadImage.imageParamsValidation,
        validator,
        controller.deleteImageById
    )

module.exports = router;
    