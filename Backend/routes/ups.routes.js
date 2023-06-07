const express = require("express");
const router = express.Router();
const { getUps } = require("../controllers/ups");

router.get("/", async (req, res, next) => {
  try {
    const upsList = await getUps();
    res.json(upsList);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
