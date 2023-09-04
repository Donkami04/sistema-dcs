const express = require("express");
const router = express.Router();
const { getWan } = require("../controllers/wan");

router.get("/", async (req, res, next) => {
  try {
    const wanList = await getWan();
    res.json(wanList);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
