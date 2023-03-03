const { validationResult } = require("express-validator");
module.exports = (request, response, next) => {
  let result = validationResult(request);
  if (result.errors.length != 0) {
    let message = result.errors.reduce((firstValue, nextValue) => {
      return firstValue + nextValue.msg + "";
    }, "");
    let error = new Error("Error" + message);
    error.status = 442;
    next(error);
  } else {
    next();
  }
};
