const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/defaultathletes", controller.poa.defaultathletes);
router.get("/findtopathletes", controller.poa.findtopathletes);
router.get("/getthedetails", controller.poa.getthedetails);

module.exports = router;
