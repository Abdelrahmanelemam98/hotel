
const express = require("express");

const controller = require("../Controller/extraServicesController");
const servicesValidation = require("../Middlware/extraServicesMW");
const validator = require("../Middlware/errorValidator");
const router = express.Router();

router.route('/service')
    .get(controller.getServices)
    .post(
        servicesValidation.extraServicesValidation,
        validator,
        controller.addService)
    .patch(
        servicesValidation.extraServicesValidation,
        validator,
        controller.updateService)
    .delete(
        servicesValidation.extraServicesValidation,
        validator,
        controller.deleteService)

module.exports = router;