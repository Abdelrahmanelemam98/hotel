
const {body, param} = require("express-validator");

exports.extraServicesValidation = [
    body('service_name').isString().optional().withMessage("Invalid Service's Name"),
    body('service_price').isInt().optional().withMessage("Invalid Service's Price"),
    body('service_details').isArray().optional().withMessage("Invalid Service's Details")
]