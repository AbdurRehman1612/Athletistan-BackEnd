const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.post("/resetpassword", controller.dashboard.resetpassword);
router.post("/resetathletepassword", controller.dashboard.resetpassword);
router.post("/updatemyprofdata", controller.dashboard.updateprofiledata);
router.post("/updateathleteprofdata", controller.dashboard.updateprofiledata);
router.post("/availabilityandfee", controller.dashboard.availabilityandfee);
router.post("/report", controller.dashboard.reportcoach);
router.get("/getmyathletes", controller.dashboard.getmyathletes);
router.get("/getmyathletesdetails", controller.dashboard.getmyathletesdetails);
router.get("/getathletedetails", controller.dashboard.getathletedetails);
router.post("/evalform", controller.dashboard.evalform);
router.get("/showathletes", controller.dashboard.showathletes);
router.get(
  "/showcustomizedathletes",
  controller.dashboard.showcutomizedathletes
);
router.get("/customizedathletedetails", controller.dashboard.athletedetails);
router.get("/getschedule", controller.dashboard.getschedule);
router.get("/getcoachschedule", controller.dashboard.getcoachschedule);
router.post("/acceptdirectreq", controller.dashboard.acceptdirectreq);
router.post("/acceptcustomizedreq", controller.dashboard.acceptcustomizedreq);
router.post("/rejectdirectreq", controller.dashboard.rejectdirectreq);
router.post("/rejectcustomizedreq", controller.dashboard.rejectcustomizedreq);

router.get("/getcoachnames", controller.dashboard.getcoachnames);
router.get("/getathletenames", controller.dashboard.getathletenames);
router.get("/getreportdata", controller.dashboard.getreportdata);
router.post("/postreviewforcoach", controller.dashboard.postreviewforcoach);

router.get(
  "/getathleteperformance",
  controller.dashboard.getathleteperformance
);
router.get("/getcoachperformance", controller.dashboard.getcoachperformance);
router.get("/getcurrentathletes", controller.dashboard.getcurrentathletes);
router.get("/getreviewforcoach", controller.dashboard.getreviewforcoach);
router.post("/checkenddate", controller.dashboard.checkenddate);

router.get("/showdirectreqhistory", controller.dashboard.showdirectreqhistory);
router.get(
  "/showcustomizedreqhistory",
  controller.dashboard.showcustomizedreqhistory
);
router.post("/directreqdelete", controller.dashboard.directreqdelete);
router.post("/customizedreqdelete", controller.dashboard.customizedreqdelete);

module.exports = router;
