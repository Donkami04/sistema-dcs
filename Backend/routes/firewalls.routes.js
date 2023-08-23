const express = require("express");
const router = express.Router();
const { getFirewalls } = require("../controllers/firewalls");

router.get("/", async (req, res, next) => {
  try {
    const allFirewalls = await getFirewalls();
    res.json(allFirewalls);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
