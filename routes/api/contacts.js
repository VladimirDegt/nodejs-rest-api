const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const validateBodyRequest= require("../../middlewares/validate-body")

router.route("/").get(ctrl.getAll).post(validateBodyRequest(), ctrl.add);

router
  .route("/:contactId")
  .get(ctrl.getByID)
  .delete(ctrl.deleteById)
  .put(validateBodyRequest(), ctrl.updateById);

module.exports = router;
