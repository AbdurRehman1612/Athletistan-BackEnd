const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/coachdetails", controller.searchacoach.coachdetails);
router.get("/details", controller.searchacoach.details);
router.get("/sportcoaches", controller.searchacoach.sportcoaches);
router.get("/filter1", controller.searchacoach.filter1);
router.get("/filter2", controller.searchacoach.filter2);
router.get("/filter3", controller.searchacoach.filter3);
router.get("/filter4", controller.searchacoach.filter4);
router.get("/filter5", controller.searchacoach.filter5);
router.get("/filter6", controller.searchacoach.filter6);
router.get("/filter7", controller.searchacoach.filter7);
router.get("/filter8", controller.searchacoach.filter8);
router.get("/filter9", controller.searchacoach.filter9);
router.get("/filter10", controller.searchacoach.filter10);
router.get("/filter11", controller.searchacoach.filter11);
router.get("/filter12", controller.searchacoach.filter12);
router.get("/filter13", controller.searchacoach.filter13);
router.get("/filter14", controller.searchacoach.filter14);
router.post("/submittraining", controller.searchacoach.addtraining);
router.post(
  "/submitcustraining",
  controller.searchacoach.addcustomizedtraining
);

module.exports = router;
