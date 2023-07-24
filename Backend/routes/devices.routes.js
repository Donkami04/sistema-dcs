const express = require("express");
const router = express.Router();
const { getDevices } = require("../controllers/devices");

router.get("/", async (req, res, next) => {
  try {
    const allDevices = await getDevices();
    res.json(allDevices);
    
  } catch (error) {
    next(error);
  }
});

module.exports = router;
