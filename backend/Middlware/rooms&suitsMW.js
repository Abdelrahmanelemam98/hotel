
const {param, body} = require("express-validator")

exports.roomsAndSuitsValidation = [
    body('type').isIn(["Junior Suits","Family Room","Double Room", "Deluxe Room", "Superior Room"]).optional().withMessage("Invalid Type"),
    body('room_price').isInt().optional().withMessage("Room Price should be integer"),
    body('room_details').isInt().optional().withMessage("Invalid Room Details"),
    body('extra_services').isInt().optional().withMessage("Invalid Extra Services")
]

exports.roomDetailsValidation = [
    body('description').isString().optional().withMessage("Invalid Description"),
    body('amenities_details').isInt().optional().withMessage("Invalid Amenities Details"),
    body('checkInAvailableTime').isString().optional().withMessage("Invalid Check in Time"),
    body('checkoutTime').isString().optional().withMessage("Invalid Check Out Time"),
    body('emailArrivalTime').isInt().optional().withMessage("Invalid Email Arrival Time"),
    body('pets').isIn(["Allow", "Not Allow"]).optional().withMessage("Invalid Pets Info"),
    body('children_details').isInt().optional().withMessage("Invalid Children Details")
]

exports.roomAmenitiesValidation = [
    body('num_of_person').isInt().optional().withMessage("Invalid Person's Number"),
    body('wifi').isIn(["Free", "Not Free"]).optional().withMessage("Invalid Wifi Info"),
    body('wifi_price').isInt().optional().withMessage("Invalid Price of Wifi"),
    body('breakfast').isIn(['Exist', 'Not Exist']).optional().withMessage("Invalid Breakfast Info"),
    body('towels').isIn(['Exist', 'Not Exist']).optional().withMessage("Invalid Towels Info"),
    body('swimming_pool').isIn(['Exist', 'Not Exist']).optional().withMessage("Invalid Swimming Pool Info")
]

exports.childrenValidation = [
    body('children_allowed').isBoolean().optional().withMessage("Invalid Children's Allowed Case"),
    body('extra_bed').isBoolean().optional().withMessage("Invalid Children's Bed Case"),
    body('extra_bed_price').isInt().optional().withMessage("Invalid Children's bed price"),
    body('children_breakfast_price').isInt().optional().withMessage("Invalid Children's Breakfast Price")
]

exports.paramsValidation = [
    param('id').isInt().withMessage("Invalid ID..Please enter integer number")
]