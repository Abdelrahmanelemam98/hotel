const express = require("express");
const { body } = require("express-validator");
const validator = require("../Middlware/errorValidator");
const homeController = require("../Controller/homeController");
const router = express.Router();

router
  .route("/home")
  .get(homeController.getAll)
  .post(
    [
      body("checkIn").isString().withMessage("Should Be String"),
      body("checkOut").isString().withMessage("Should Be String"),
      body("Adult").isString().withMessage("Should Be String"),
      body("Childern").isString().withMessage("Should Be String"),
      body("Room").isString().withMessage("Should Be String"),
    ],
    validator,
    homeController.addData
  )
  .put()
  .delete();

module.exports = router;
