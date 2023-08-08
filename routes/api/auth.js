const express = require("express");

const validateBodyRequest = require("../../middlewares/validate-body");
const {registerSchema, loginSchema} = require("../../schemas");
const ctrl = require("../../controllers/auth");
const checkUniqueEmail = require("../../middlewares/check-unique-email");

const router = express.Router();

router.post("/register", validateBodyRequest(registerSchema), checkUniqueEmail, ctrl.register);
router.post("/login", validateBodyRequest(loginSchema), ctrl.login);

module.exports = router;
