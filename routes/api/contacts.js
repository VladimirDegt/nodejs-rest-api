const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const validateBodyRequest = require("../../middlewares/validate-body");
const {validateBody, validateFieldFavorire} = require("../../schemas")
const isValidId = require("../../middlewares/validate-id");

router.route("/").get(ctrl.getAll).post(validateBodyRequest(validateBody), ctrl.add);

router
  .route("/:contactId")
  .get(isValidId, ctrl.getByID)
  .put(isValidId, validateBodyRequest(validateBody), ctrl.updateById)
  .delete(isValidId, ctrl.deleteById);

router
  .route("/:contactId/favorite")
  .patch(isValidId, validateBodyRequest(validateFieldFavorire), ctrl.updateStatusContact);

module.exports = router;
