const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/data", controller.guinness.getdata);
router.get("/headerimages", controller.guinness.getheaderimages);
router.get("/rdetails", controller.guinness.recorddetails);
// router.get("/reldetails", controller.guinness.relatedrecords);
router.get("/guinnesscatlist", controller.olympics.guinnesscatlist);
router.post("/breaktherecordform", controller.guinness.breaktherecorddetails);

module.exports = router;
