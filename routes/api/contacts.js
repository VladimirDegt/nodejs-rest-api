const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const validateBodyRequest = require("../../middlewares/validate-body");
const { schemaContact, schemaFavorite } = require("../../schemas");
const isValidId = require("../../middlewares/validate-id");

router
  .route("/")
  .get(ctrl.getAll)
  .post(validateBodyRequest(schemaContact), ctrl.add);

router
  .route("/:contactId")
  .get(isValidId, ctrl.getByID)
  .put(isValidId, validateBodyRequest(schemaContact), ctrl.updateById)
  .delete(isValidId, ctrl.deleteById);

router
  .route("/:contactId/favorite")
  .patch(
    isValidId,
    validateBodyRequest(schemaFavorite),
    ctrl.updateStatusContact
  );

module.exports = router;
