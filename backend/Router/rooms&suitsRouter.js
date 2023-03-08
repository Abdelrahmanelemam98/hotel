
const express = require('express');
const controller = require('../Controller/rooms&suitsController');
const roomValidation=require('../Middlware/rooms&suitsMW');
const validator = require('../Middlware/errorValidator');
const router = express.Router();

router.route('/room')
    .post(
        roomValidation.roomsAndSuitsValidation,
        roomValidation.roomDetailsValidation,
        roomValidation.roomAmenitiesValidation,
        roomValidation.childrenValidation,
        validator,
        controller.addRoom)
    .get(controller.getRooms)
    
router.route('/room/:id')
    .delete(
        roomValidation.paramsValidation,
        validator,
        controller.deleteRoomByID)
    .patch(
        roomValidation.roomsAndSuitsValidation,
        roomValidation.roomDetailsValidation,
        roomValidation.roomAmenitiesValidation,
        roomValidation.childrenValidation,
        roomValidation.paramsValidation,
        validator,
        controller.updateRoomById)

module.exports = router;