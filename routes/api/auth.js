const express = require("express");

const router = express.Router();

const validateBodyRequest = require("../../middlewares/validate-body");
const {registerSchema} = require("../../schemas")

router.post("/register", validateBodyRequest(registerSchema));

module.exports = router;
