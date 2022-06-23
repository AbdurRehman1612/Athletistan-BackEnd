const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/sportslist", controller.olympics.sportslist);
router.get("/guinnesscatlist", controller.olympics.guinnesscatlist);

router.get("/data", controller.olympics.getdata);
router.get("/odetails", controller.olympics.olympicsdetails);
router.get("/asia", controller.olympics.asia);
router.get("/rotw", controller.olympics.restoftheworld);

module.exports = router;
