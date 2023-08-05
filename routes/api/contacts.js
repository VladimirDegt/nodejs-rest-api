const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const validateBodyRequest = require("../../middlewares/validate-body");
const validateFavoriteRequest = require("../../middlewares/validate-field-favorite");
const isValidId = require("../../middlewares/isValidId");

router.route("/").get(ctrl.getAll).post(validateBodyRequest(), ctrl.add);

router
  .route("/:contactId")
  .get(isValidId, ctrl.getByID)
  .put(isValidId, validateBodyRequest(), ctrl.updateById)
  .delete(isValidId, ctrl.deleteById);

router
  .route("/:contactId/favorite")
  .patch(isValidId, validateFavoriteRequest(), ctrl.updateStatusContact);

module.exports = router;
