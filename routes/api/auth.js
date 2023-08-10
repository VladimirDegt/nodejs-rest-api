const express = require("express");

const { registerSchema, loginSchema, fieldSubscriptionSchema } = require("../../schemas");
const ctrl = require("../../controllers/auth");
const validateBodyRequest = require("../../middlewares/validate-body");
const checkUniqueEmail = require("../../middlewares/check-unique-email");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.post(
  "/register",
  validateBodyRequest(registerSchema),
  checkUniqueEmail,
  ctrl.register
);
router.post("/login", validateBodyRequest(loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch("/", authenticate, validateBodyRequest(fieldSubscriptionSchema), ctrl.updateFieldSubscription);

module.exports = router;
