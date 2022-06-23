const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.post("/signIn", controller.Log.signin);
router.post("/forgetpassword", controller.Log.forgotpassword);
router.post("/newpassword", controller.Log.resetPassword);
router.post("/verify-token", controller.Log.verifyToken);
router.post("/coachsignUp", controller.Log.Coachsignup);
router.post("/athletesignUp", controller.Log.Athletesignup);

module.exports = router;
