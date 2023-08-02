const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.route("/").get(ctrl.getAll).post(ctrl.add);

router
  .route("/:contactId")
  .get(ctrl.getByID)
  .delete(ctrl.deleteById)
  .put(ctrl.updateById);

module.exports = router;
